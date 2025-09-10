// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract FHEDataVault is SepoliaConfig {
    using FHE for *;
    
    struct DataRecord {
        euint32 recordId;
        euint32 dataSize;
        euint32 accessCount;
        euint32 encryptionLevel;
        ebool isPublic;
        ebool isEncrypted;
        string dataHash;
        string metadataHash;
        address owner;
        address[] authorizedUsers;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 expiresAt;
    }
    
    struct AccessLog {
        euint32 logId;
        address user;
        euint32 accessType; // 1: read, 2: write, 3: delete
        ebool isAuthorized;
        uint256 timestamp;
        string ipHash;
    }
    
    struct UserProfile {
        euint32 userId;
        euint32 reputation;
        euint32 storageQuota;
        euint32 usedStorage;
        ebool isActive;
        string publicKey;
        address walletAddress;
        uint256 joinedAt;
    }
    
    mapping(uint256 => DataRecord) public dataRecords;
    mapping(uint256 => AccessLog) public accessLogs;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => euint32) public userPermissions;
    mapping(string => uint256) public dataHashToRecordId;
    
    uint256 public recordCounter;
    uint256 public logCounter;
    uint256 public userCounter;
    
    address public owner;
    address public admin;
    address public verifier;
    
    // Events
    event DataRecordCreated(uint256 indexed recordId, address indexed owner, string dataHash);
    event DataRecordUpdated(uint256 indexed recordId, address indexed updater);
    event DataRecordDeleted(uint256 indexed recordId, address indexed deleter);
    event AccessGranted(uint256 indexed recordId, address indexed user, address indexed granter);
    event AccessRevoked(uint256 indexed recordId, address indexed user, address indexed revoker);
    event UserRegistered(address indexed user, uint256 userId);
    event AccessLogged(uint256 indexed logId, uint256 indexed recordId, address indexed user);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event StorageQuotaUpdated(address indexed user, uint32 quota);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin || msg.sender == owner, "Only admin can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    modifier recordExists(uint256 recordId) {
        require(dataRecords[recordId].owner != address(0), "Data record does not exist");
        _;
    }
    
    constructor(address _admin, address _verifier) {
        owner = msg.sender;
        admin = _admin;
        verifier = _verifier;
    }
    
    // User Management Functions
    function registerUser(
        string memory _publicKey,
        externalEuint32 initialQuota,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(userProfiles[msg.sender].walletAddress == address(0), "User already registered");
        
        uint256 userId = userCounter++;
        euint32 internalQuota = FHE.fromExternal(initialQuota, inputProof);
        
        userProfiles[msg.sender] = UserProfile({
            userId: FHE.asEuint32(userId),
            reputation: FHE.asEuint32(100), // Initial reputation
            storageQuota: internalQuota,
            usedStorage: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            publicKey: _publicKey,
            walletAddress: msg.sender,
            joinedAt: block.timestamp
        });
        
        emit UserRegistered(msg.sender, userId);
        return userId;
    }
    
    function updateUserReputation(
        address user,
        externalEuint32 newReputation,
        bytes calldata inputProof
    ) public onlyVerifier {
        require(userProfiles[user].walletAddress != address(0), "User not registered");
        
        euint32 internalReputation = FHE.fromExternal(newReputation, inputProof);
        userProfiles[user].reputation = internalReputation;
        
        emit ReputationUpdated(user, 0); // Will be decrypted off-chain
    }
    
    function updateStorageQuota(
        address user,
        externalEuint32 newQuota,
        bytes calldata inputProof
    ) public onlyAdmin {
        require(userProfiles[user].walletAddress != address(0), "User not registered");
        
        euint32 internalQuota = FHE.fromExternal(newQuota, inputProof);
        userProfiles[user].storageQuota = internalQuota;
        
        emit StorageQuotaUpdated(user, 0); // Will be decrypted off-chain
    }
    
    // Data Record Management Functions
    function createDataRecord(
        string memory _dataHash,
        string memory _metadataHash,
        externalEuint32 dataSize,
        externalEuint32 encryptionLevel,
        externalEuint32 expiresIn,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(userProfiles[msg.sender].walletAddress != address(0), "User not registered");
        require(bytes(_dataHash).length > 0, "Data hash cannot be empty");
        require(dataHashToRecordId[_dataHash] == 0, "Data hash already exists");
        
        uint256 recordId = recordCounter++;
        euint32 internalDataSize = FHE.fromExternal(dataSize, inputProof);
        euint32 internalEncryptionLevel = FHE.fromExternal(encryptionLevel, inputProof);
        euint32 internalExpiresIn = FHE.fromExternal(expiresIn, inputProof);
        
        dataRecords[recordId] = DataRecord({
            recordId: FHE.asEuint32(recordId),
            dataSize: internalDataSize,
            accessCount: FHE.asEuint32(0),
            encryptionLevel: internalEncryptionLevel,
            isPublic: FHE.asEbool(false),
            isEncrypted: FHE.asEbool(true),
            dataHash: _dataHash,
            metadataHash: _metadataHash,
            owner: msg.sender,
            authorizedUsers: new address[](0),
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            expiresAt: block.timestamp + 86400 // Default 24 hours, will be updated with FHE value
        });
        
        dataHashToRecordId[_dataHash] = recordId;
        
        emit DataRecordCreated(recordId, msg.sender, _dataHash);
        return recordId;
    }
    
    function updateDataRecord(
        uint256 recordId,
        string memory _newDataHash,
        string memory _newMetadataHash,
        externalEuint32 newDataSize,
        bytes calldata inputProof
    ) public recordExists(recordId) {
        require(dataRecords[recordId].owner == msg.sender, "Only owner can update record");
        require(bytes(_newDataHash).length > 0, "Data hash cannot be empty");
        
        // Update data size
        euint32 internalNewDataSize = FHE.fromExternal(newDataSize, inputProof);
        dataRecords[recordId].dataSize = internalNewDataSize;
        dataRecords[recordId].dataHash = _newDataHash;
        dataRecords[recordId].metadataHash = _newMetadataHash;
        dataRecords[recordId].updatedAt = block.timestamp;
        
        emit DataRecordUpdated(recordId, msg.sender);
    }
    
    function deleteDataRecord(uint256 recordId) public recordExists(recordId) {
        require(dataRecords[recordId].owner == msg.sender, "Only owner can delete record");
        
        // Clear the record
        delete dataRecords[recordId];
        delete dataHashToRecordId[dataRecords[recordId].dataHash];
        
        emit DataRecordDeleted(recordId, msg.sender);
    }
    
    // Access Control Functions
    function grantAccess(uint256 recordId, address user) public recordExists(recordId) {
        require(dataRecords[recordId].owner == msg.sender, "Only owner can grant access");
        require(user != address(0), "Invalid user address");
        require(userProfiles[user].walletAddress != address(0), "User not registered");
        
        // Add user to authorized list if not already present
        address[] storage authorizedUsers = dataRecords[recordId].authorizedUsers;
        bool alreadyAuthorized = false;
        for (uint i = 0; i < authorizedUsers.length; i++) {
            if (authorizedUsers[i] == user) {
                alreadyAuthorized = true;
                break;
            }
        }
        
        if (!alreadyAuthorized) {
            authorizedUsers.push(user);
        }
        
        emit AccessGranted(recordId, user, msg.sender);
    }
    
    function revokeAccess(uint256 recordId, address user) public recordExists(recordId) {
        require(dataRecords[recordId].owner == msg.sender, "Only owner can revoke access");
        
        address[] storage authorizedUsers = dataRecords[recordId].authorizedUsers;
        for (uint i = 0; i < authorizedUsers.length; i++) {
            if (authorizedUsers[i] == user) {
                authorizedUsers[i] = authorizedUsers[authorizedUsers.length - 1];
                authorizedUsers.pop();
                break;
            }
        }
        
        emit AccessRevoked(recordId, user, msg.sender);
    }
    
    // Access Logging Functions
    function logAccess(
        uint256 recordId,
        externalEuint32 accessType,
        string memory ipHash,
        bytes calldata inputProof
    ) public recordExists(recordId) returns (uint256) {
        require(userProfiles[msg.sender].walletAddress != address(0), "User not registered");
        
        uint256 logId = logCounter++;
        euint32 internalAccessType = FHE.fromExternal(accessType, inputProof);
        
        // Check if user has access
        bool hasAccess = false;
        if (dataRecords[recordId].owner == msg.sender) {
            hasAccess = true;
        } else {
            address[] memory authorizedUsers = dataRecords[recordId].authorizedUsers;
            for (uint i = 0; i < authorizedUsers.length; i++) {
                if (authorizedUsers[i] == msg.sender) {
                    hasAccess = true;
                    break;
                }
            }
        }
        
        accessLogs[logId] = AccessLog({
            logId: FHE.asEuint32(logId),
            user: msg.sender,
            accessType: internalAccessType,
            isAuthorized: FHE.asEbool(hasAccess),
            timestamp: block.timestamp,
            ipHash: ipHash
        });
        
        // Update access count if authorized
        if (hasAccess) {
            dataRecords[recordId].accessCount = FHE.add(dataRecords[recordId].accessCount, FHE.asEuint32(1));
        }
        
        emit AccessLogged(logId, recordId, msg.sender);
        return logId;
    }
    
    // View Functions
    function getDataRecordInfo(uint256 recordId) public view recordExists(recordId) returns (
        string memory dataHash,
        string memory metadataHash,
        uint8 dataSize,
        uint8 accessCount,
        uint8 encryptionLevel,
        bool isPublic,
        bool isEncrypted,
        address owner,
        uint256 createdAt,
        uint256 updatedAt,
        uint256 expiresAt
    ) {
        DataRecord storage record = dataRecords[recordId];
        return (
            record.dataHash,
            record.metadataHash,
            0, // FHE.decrypt(record.dataSize) - will be decrypted off-chain
            0, // FHE.decrypt(record.accessCount) - will be decrypted off-chain
            0, // FHE.decrypt(record.encryptionLevel) - will be decrypted off-chain
            false, // FHE.decrypt(record.isPublic) - will be decrypted off-chain
            false, // FHE.decrypt(record.isEncrypted) - will be decrypted off-chain
            record.owner,
            record.createdAt,
            record.updatedAt,
            record.expiresAt
        );
    }
    
    function getUserProfile(address user) public view returns (
        uint8 userId,
        uint8 reputation,
        uint8 storageQuota,
        uint8 usedStorage,
        bool isActive,
        string memory publicKey,
        address walletAddress,
        uint256 joinedAt
    ) {
        UserProfile storage profile = userProfiles[user];
        return (
            0, // FHE.decrypt(profile.userId) - will be decrypted off-chain
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(profile.storageQuota) - will be decrypted off-chain
            0, // FHE.decrypt(profile.usedStorage) - will be decrypted off-chain
            false, // FHE.decrypt(profile.isActive) - will be decrypted off-chain
            profile.publicKey,
            profile.walletAddress,
            profile.joinedAt
        );
    }
    
    function getAccessLogInfo(uint256 logId) public view returns (
        address user,
        uint8 accessType,
        bool isAuthorized,
        uint256 timestamp,
        string memory ipHash
    ) {
        AccessLog storage log = accessLogs[logId];
        return (
            log.user,
            0, // FHE.decrypt(log.accessType) - will be decrypted off-chain
            false, // FHE.decrypt(log.isAuthorized) - will be decrypted off-chain
            log.timestamp,
            log.ipHash
        );
    }
    
    function getAuthorizedUsers(uint256 recordId) public view recordExists(recordId) returns (address[] memory) {
        return dataRecords[recordId].authorizedUsers;
    }
    
    // Admin Functions
    function setAdmin(address _admin) public onlyOwner {
        require(_admin != address(0), "Invalid admin address");
        admin = _admin;
    }
    
    function setVerifier(address _verifier) public onlyOwner {
        require(_verifier != address(0), "Invalid verifier address");
        verifier = _verifier;
    }
    
    function emergencyPause() public onlyAdmin {
        // Implementation for emergency pause functionality
        // This would pause all contract operations
    }
    
    function emergencyUnpause() public onlyOwner {
        // Implementation for emergency unpause functionality
        // This would resume all contract operations
    }
}

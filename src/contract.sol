pragma solidity ^0.8.0;

contract voterListContract {
    /**
     * struct that hold Voter information
     **/
        struct Voter {
            string voterName;
            uint256 cnic;
            uint256 voteConstituency;
            bool authorize;
            bool isVoter;
        }
        mapping(address => Voter []) internal voterList;
        address[] voterAddressArray;
        
           /**
     * Function to get all voter addresses
     **/
        function getVoterAddress() public view returns(address[] memory) {
          return voterAddressArray;
        }
        
        /**
     * Function to add voter information into 'Voter List' & always require a unique voter
     **/
        function addVoter(address _voterAddress, string memory _name, uint256 _cnic,uint256  _voteConstituency) public returns (bool) {
            require(_voterAddress != address(0), "invalid address");
            bool check;
            Voter[] memory voter = voterList[_voterAddress];
            if(voter.length == 0) {
            voterList[_voterAddress].push(Voter(_name, _cnic, _voteConstituency, false, true));
            voterAddressArray.push(_voterAddress);
            check = true;
            }
            else{
                check = false;
            }
            return check;
        }
        
        /**
     * Function to get Voter Information from 'Voter List'
     **/ 
        function getVoterInfo(address _voterAddress) public view returns(Voter[] memory) {
            Voter[] memory voter = voterList[_voterAddress];
            return voter;
        }
        
        /**
     * Function to delete Voter from 'Voter List'
     **/
        function deleteVoter(address _voterAddress) public returns (bool) {
            delete voterList[_voterAddress];
            return true;
        }
}
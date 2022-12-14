library willInfo {}

library Library {
    struct data {
        uint val;
        bool isValue;
    }
}

contract Array {
    using Library for Library.data;
    //mapping(key => value) name;
    mapping(address => Library.data) clusterContract;

    // function addCluster(address id) returns (bool) {
    //     if (clusterContract[id].isValue) throw; // duplicate key
    //     // insert this
    //     return true;
    // }
}

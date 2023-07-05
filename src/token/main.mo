import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor Token {

    let owner : Principal = Principal.fromText("v25je-fsuxv-jb2w7-n7doc-357p6-nzodq-k4xbg-o2o3e-x46dm-v752p-wqe");
    let totalSupply : Nat = 10000000000;
    let symbol : Text = "aniate";

    // let ownerNew : Principal = Principal.fromText("gho24-mqaaa-aaaao-axbua-cai");
    // let ownerNewAmount : Nat = 0;

    private stable var balanceEntries : [(Principal, Nat)] = [];

    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSupply);
    // balances.put(ownerNew, ownerNewAmount);

    public query func balanceOf(who : Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared (msg) func payOut() : async Text {
        if (balances.get(msg.caller) == null) {
            let amount = 1000;
            let balance : Nat = await balanceOf(owner);
            if (balance >= amount) {
                let newBalance : Nat = balance - amount;
                balances.put(msg.caller, amount);
                balances.put(owner, newBalance);
                return "Transfered";
            } else {
                return "Not enought aniateToken left";
            };
        } else {
            return "Already Transfered";
        };
    };

    public shared (msg) func checkId() : async Text {
        return Principal.toText(msg.caller);
    };

    public shared (msg) func transferFunds(receiver : Principal, amount : Nat) : async Text {
        if (balances.get(msg.caller) != null) {
            if (balances.get(receiver) != null) {
                let balance : Nat = await balanceOf(msg.caller);
                if (balance >= amount) {
                    let newBalance : Nat = balance - amount;
                    let receiverBalance : Nat = await balanceOf(receiver);
                    let newReceiverBalance : Nat = receiverBalance + amount;
                    balances.put(msg.caller, newBalance);
                    balances.put(receiver, newReceiverBalance);
                    return "aniateToken transfered successfully.";
                } else {
                    return "Not enough aniateToken to transfer";
                };
            } else {
                return "Receiver account does not exist.";
            };
        } else {
            return "You do not have any Account. Please Faucet first!";
        };
    };

    public shared (msg) func transfer(receiver : Principal, amount : Nat) : async Text {
        if (balances.get(msg.caller) != null) {
            let balance : Nat = await balanceOf(msg.caller);
            if (balance >= amount) {
                let newBalance : Nat = balance - amount;
                let receiverBalance : Nat = await balanceOf(receiver);
                let newReceiverBalance : Nat = receiverBalance + amount;
                balances.put(msg.caller, newBalance);
                balances.put(receiver, newReceiverBalance);
                return "aniateToken transfered successfully.";
            } else {
                return "Not enough aniateToken to transfer";
            };

        } else {
            return "You do not have any Account. Please Faucet first!";
        };
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
            balances.put(owner, totalSupply);
            // balances.put(ownerNew, ownerNewAmount);
        };
    }

};

// Transaction history component of the contract

import { useEffect, useState } from "react";
import { useTransaction } from "wagmi";
import classes from "./classes.module.scss";

export function BasicContractHistory() {
  const { isSuccess, isPending } = useTransaction();
  const [contractValue, setContractValue] = useState("");
  const [payableValue, setPayableValue] = useState("");

  // const updateContractSetValue = () => {
  //   contract.methods
  //     .setContractValue(contractValue)
  //     .send()
  //     .then((tx) => {
  //       console.log(tx);
  //     });
  // };

  // const updateContractPayableValue = () => {
  //   contract.methods
  //     .setContractPayableValue(payableValue)
  //     .send()
  //     .then((tx) => {
  //       console.log(tx);
  //     });
  // };

  useEffect(() => {
    if (isPending) {
      console.log("Pending");
    }
    if (isSuccess) {
      // console.log("Success : ", transactionHash);
    }
  }, [isSuccess, isPending]);

  return (
    <div className={classes.container}>
      <div className={classes.formGroup}>
        <label htmlFor="contractValue" className={classes.label}>
          Set contract value
        </label>
        <input
          id="contractValue"
          type="number"
          value={contractValue}
          onChange={(e) => setContractValue(e.target.value)}
          className={classes.input}
        />
        <button
          // onClick={updateContractSetValue}
          className={classes.button}
          disabled={isPending}>
          Update
        </button>
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="payableValue" className={classes.label}>
          Set contract payable value
        </label>
        <input
          id="payableValue"
          type="number"
          value={payableValue}
          onChange={(e) => setPayableValue(e.target.value)}
          className={classes.input}
        />
        <button
          // onClick={updateContractPayableValue}
          className={classes.button}
          disabled={isPending}>
          Update
        </button>
      </div>

      {/* {isSuccess && transactionHash && (
        <TransactionReceipt hash={transactionHash} />
      )} */}
    </div>
  );
}

import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState, useRef } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeNameInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUsername = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    const enteredCollegeName = collegeNameInputRef.current.value;

    if (
      enteredUsername.trim().length === 0 ||
      enteredUserAge.trim().length === 0
    ) {
      setError({
        title: "An Error Occured",
        message: "Invalid name and age",
      });
      return;
    }

    if (+enteredUserAge < 0) {
      setError({
        title: "An Error Occured",
        message: "Invalid age (Should be > 0)",
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredUserAge,enteredCollegeName);

    console.log(enteredUsername, enteredUserAge,enteredCollegeName);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    collegeNameInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}></input>
          <label htmlFor="age">Age (years)</label>
          <input id="age" type="number" ref={ageInputRef}></input>
          <label htmlFor="college">college</label>
          <input id="college" type="text" ref={collegeNameInputRef}></input>
          <Button type="submit">AddUser</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;

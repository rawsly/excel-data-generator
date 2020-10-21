import React, { useState, useRef } from "react";
import "./App.css";
import Chance from "chance";
import _ from "lodash";
import { ACCOUNTS, DEPARTMENTS, EXPERTISES, GENDERS, LABELS, ROLES } from "./constants";

function App() {
  const dataRef = useRef();
  const chance = new Chance();
  const [size, setSize] = useState(100);
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState("example.com");
  const [prefix, setPrefix] = useState("T_");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  const handlePrefixChange = (e) => {
    setPrefix(e.target.value);
  };

  const generateFirstName = () => {
    setData([]);
    const start = performance.now();
    let repeat = size;
    const names = [];
    while (repeat > 0) {
      const name = chance.first();
      names.push(name);
      repeat = repeat - 1;
    }
    setData(_.join(names, "\n"));
    const end = performance.now();
    console.log("Running time: ", end - start);
  };

  const generateLastName = () => {
    setData([]);
    let repeat = size;
    const names = [];
    while (repeat > 0) {
      const name = chance.last();
      names.push(name);
      repeat = repeat - 1;
    }
    setData(_.join(names, "\n"));
  };

  const generateEmail = () => {
    setData([]);
    let repeat = size;
    const emails = chance.unique(chance.email, repeat, { domain });
    setData(_.join(emails, "\n"));
  };

  const generateUsername = () => {
    setData([]);
    let repeat = size;
    const usernames = chance.unique(chance.string, repeat, { length: 12, numeric: true, alpha: true, casing: 'upper', symbols: false });
    const usernamesWithPrefix = _.map(usernames, username => {
      return `${prefix}${username}`;
    })
    setData(_.join(usernamesWithPrefix, "\n"));
  };

  const generateRole = () => {
    setData([]);
    let repeat = size;
    const roles = [];
    while (repeat > 0) {
      const numberOfRoles = chance.integer({ min: 1, max: 4 });
      const numbers = chance.unique(chance.integer, numberOfRoles, { min: 0, max: ROLES.length - 1 });
      const selectedRoles = _.map(numbers, n => ROLES[n]).join(', ');
      roles.push(selectedRoles);
      repeat = repeat - 1;
    }

    setData(_.join(roles, "\n"));
  };

  const generateAccount = () => {
    setData([]);
    let repeat = size;
    const accounts = [];
    while (repeat > 0) {
      const number = chance.integer({ min: 0, max: ACCOUNTS.length - 1 });
      const selectedAccount = ACCOUNTS[number];
      accounts.push(selectedAccount);
      repeat = repeat - 1;
    }

    setData(_.join(accounts, "\n"));
  };

  const generateDepartment = () => {
    setData([]);
    let repeat = size;
    const departments = [];
    while (repeat > 0) {
      const number = chance.integer({ min: 0, max: DEPARTMENTS.length - 1 });
      const selectedDepartment = DEPARTMENTS[number];
      departments.push(selectedDepartment);
      repeat = repeat - 1;
    }

    setData(_.join(departments, "\n"));
  }

  const generateExpertise = () => {
    setData([]);
    let repeat = size;
    const expertises = [];
    while (repeat > 0) {
      const numberOfExpertises = chance.integer({ min: 1, max: 4 });
      const numbers = chance.unique(chance.integer, numberOfExpertises, { min: 0, max: EXPERTISES.length - 1 });
      const selectedExpertises = _.map(numbers, n => EXPERTISES[n]).join(', ');
      expertises.push(selectedExpertises);
      repeat = repeat - 1;
    }

    setData(_.join(expertises, "\n"));
  }

  const generateLabels = () => {
    setData([]);
    let repeat = size;
    const labels = [];
    while (repeat > 0) {
      const numberOfLabels = chance.integer({ min: 1, max: 4 });
      const numbers = chance.unique(chance.integer, numberOfLabels, { min: 0, max: LABELS.length - 1 });
      const selectedLabels = _.map(numbers, n => LABELS[n]).join(', ');
      labels.push(selectedLabels);
      repeat = repeat - 1;
    }

    setData(_.join(labels, "\n"));
  }

  const generateGenders = () => {
    setData([]);
    let repeat = size;
    const genders = [];
    while (repeat > 0) {
      const number = chance.integer({ min: 0, max: GENDERS.length - 1 });
      const selectedGender = GENDERS[number];
      genders.push(selectedGender);
      repeat = repeat - 1;
    }

    setData(_.join(genders, "\n"));
  }

  const handleCopy = (e) => {
    dataRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  };

  return (
    <div>
      <div className="action-container">
        <input
          type="text"
          placeholder="Size"
          onChange={handleSizeChange}
          value={size}
        />
        <input
          type="text"
          placeholder="Domain"
          onChange={handleDomainChange}
          value={domain}
        />
        <input
          type="text"
          placeholder="Username Prefix"
          onChange={handlePrefixChange}
          value={prefix}
        />
        <button type="button" onClick={generateFirstName}>
          First Name
        </button>
        <button type="button" onClick={generateLastName}>
          Last Name
        </button>
        <button type="button" onClick={generateEmail}>
          Email
        </button>
        <button type="button" onClick={generateUsername}>
          Username
        </button>
        <button type="button" onClick={generateRole}>
          Roles
        </button>
        <button type="button" onClick={generateAccount}>
          Account
        </button>
        <button type="button" onClick={generateDepartment}>
          Department
        </button>
        <button type="button" onClick={generateExpertise}>
          Expertises
        </button>
        <button type="button" onClick={generateLabels}>
          Labels
        </button>
        <button type="button" onClick={generateGenders}>
          Genders
        </button>
      </div>
      <button onClick={handleCopy} type="button">
        Copy
      </button>
      <div className="data-container">
        <textarea value={data} ref={dataRef}></textarea>
      </div>
    </div>
  );
}

export default App;

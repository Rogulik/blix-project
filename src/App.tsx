import { useState } from "react";
import { parse, stringify, toJSON, fromJSON } from "flatted";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

function App() {
  const [accountType, setAccountType] = useState("advanced");
  const [emailErrorMessage, setEmailErrorMessage] = useState<
    string | undefined
  >();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accountType = e.currentTarget.accountType.value;
    const userName = e.currentTarget.userName.value;
    const password = e.currentTarget.password.value;
    const serverAddress = e.currentTarget.serverAddress.value;
    const serverPath = e.currentTarget.serverPath.value;
    const port = e.currentTarget.port.value;
    const useSSL = e.currentTarget.useSSL.value;

    if (!emailRegex.test(userName)) setEmailErrorMessage("Incorrect username");

    console.log(
      "submit results:",
      JSON.stringify(
        accountType === "advanced"
          ? {
              accountType,
              userName,
              password,
              serverAddress,
              serverPath,
              port,
              useSSL: useSSL,
            }
          : {
              accountType,
              userName,
              password,
              serverAddress,
            }
      )
    );
  };
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen">
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="accountType">Account Type:</label>
          <select
            name="accountType"
            id="accountType"
            defaultValue="advanced"
            onChange={(e) => setAccountType(e.target.value)}
            value={accountType}
          >
            <option value="advanced">Advanced</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        <label htmlFor="userName">User name:</label>
        <input
          id="userName"
          name="userName"
          placeholder="name@example.com"
          type="email"
          required
          className="w-[350px] outline bg-white mb-3 ml-5 p-1 placeholder:text-gray-300  rounded-sm border-1 border-gray-600 outline-1 outline-gray-400 focus:outline-red-500 focus:outline-4"
        />
        <p>{emailErrorMessage}</p>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Required"
            required
            className="input-text"
          />
        </div>
        {accountType === "advanced" && (
          <>
            <div>
              <label htmlFor="serverAddress">Server Address:</label>
              <input
                type="text"
                id="serverAddress"
                name="serverAddress"
                placeholder="example.com"
                className="input-text"
              />
            </div>
            <div>
              <label htmlFor="serverPath">Server Path:</label>
              <input
                type="text"
                id="serverPath"
                name="serverPath"
                placeholder="/calendar/user/"
                className="input-text"
              />
            </div>
            <div>
              <label htmlFor="port" className="label-input">
                Port:
              </label>
              <input type="text" id="port" name="port" className="input-text" />
            </div>
            <div>
              <label className="label-input" htmlFor="useSSL">
                Use SSL:
              </label>
              <input type="checkbox" id="useSSL" name="useSSL" checked />
            </div>
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

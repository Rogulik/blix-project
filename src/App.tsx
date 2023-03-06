import { useState } from "react";
import { parse, stringify, toJSON, fromJSON } from "flatted";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

function App() {
  const [accountType, setAccountType] = useState("advanced");
  const [emailErrorMessage, setEmailErrorMessage] = useState<
    string | undefined
  >();
  const [useSSL, setUseSSL] = useState(true);
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
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex justify-center items-center  mb-3">
          <label htmlFor="accountType" className="label-input">
            Account Type:
          </label>
          <select
            className="input-text"
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
        <div className="flex justify-center items-center  mb-3">
          <label htmlFor="userName" className="label-input">
            User name:
          </label>
          <input
            id="userName"
            name="userName"
            placeholder="name@example.com"
            type="email"
            required
            className="input-text"
          />
          <p>{emailErrorMessage}</p>
        </div>
        <div className="flex justify-center items-center  mb-3">
          <label htmlFor="password" className="label-input">
            Password:
          </label>
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
            <div className="flex justify-center items-center  mb-3">
              <label htmlFor="serverAddress" className="label-input">
                Server Address:
              </label>
              <input
                type="text"
                id="serverAddress"
                name="serverAddress"
                placeholder="example.com"
                className="input-text"
              />
            </div>
            <div className="flex justify-center items-center  mb-3">
              <label htmlFor="serverPath" className="label-input">
                Server Path:
              </label>
              <input
                type="text"
                id="serverPath"
                name="serverPath"
                placeholder="/calendar/user/"
                className="input-text"
              />
            </div>
            <div className="flex justify-start items-center  mb-3 w-[500px]">
              <label htmlFor="port" className="label-input -ml-2">
                Port:
              </label>
              <input
                type="text"
                id="port"
                name="port"
                className="input-text w-[50px] self-start justify-self-start "
              />
              <div className="ml-4">
                <input
                  type="checkbox"
                  onChange={(e) => setUseSSL((prevState) => !prevState)}
                  id="useSSL"
                  name="useSSL"
                  checked={useSSL}
                  className="mr-3"
                />
                <label className="label-input" htmlFor="useSSL">
                  Use SSL
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center"></div>
          </>
        )}

        <button
          type="submit"
          className="p-2 mt-3 bg-red-600 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

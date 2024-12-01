import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, getUserDetails, getUserInfo, getUserVaccCard, getUserMedicalRecords, getSocialRecords } from "../lib/appwrite"; 

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null); 
  const [userInfo, setUserInfo] = useState(null); 
  const [vaccCard, setVaccCard] = useState(null);
  const [medRecord, setMedRecord] = useState([]);
  const [famRecord, setFamRecord] = useState([]);
  const [socialRecord, setSocialRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  
  

  
  const addMedRecord = (newRecord) => {
    setMedRecord((prevRecords) => [...prevRecords, newRecord]);
  };
  const addFamRecord = (newRecord) => {
    setFamRecord((prevRecords) => [...prevRecords, newRecord]);
  };

  const addSocialRecord = (newRecord) => {
    setSocialRecord((prevRecords) => [...prevRecords, newRecord]);
  };

  useEffect(() => {
    getCurrentUser()
      .then(async (res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
          
          // Fetch user details
          const details = await getUserDetails(res.$id);
          setUserDetails(details); // Set user details

          // Fetch user info
          const info = await getUserInfo(); // Fetch user info based on account
          setUserInfo(info); // Set user info

          const vaccInfo = await getUserVaccCard();
          setVaccCard(vaccInfo);

          const medRecordInfo = await getUserMedicalRecords(); // Retrieve all medical records
          setMedRecord(medRecordInfo); // Set multiple medical records
          
          const socialRecordInfo = await getSocialRecords();
          setSocialRecord(socialRecordInfo);
          // const famRecordInfo = await getUserFamRecord();
          // setFamRecord(famRecordInfo); 


        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        userDetails, // Provide userDetails
        userInfo, // Provide userInfo
        vaccCard,
        medRecord, 
        addMedRecord,
        socialRecord,
        addSocialRecord,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

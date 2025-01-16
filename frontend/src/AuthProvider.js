import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize states
  const [EmployeeRegId, setEmployeeRegId] = useState(null);
  const [orgId, setorgId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [sId, setSId] = useState(null);
  const [telId, settelId] = useState(null);
  const [tId, settId] = useState(null);
  const [oTLId, setoTLId] = useState(null);
  const [accId, setaccId] = useState(null);
  const [SelectedItemDate, setSelectedDateItem] = useState(null);
  const [count, setCount] = useState(null);
  const [techcount, settechCount] = useState(null);
  const [salescount, setSalescount] = useState(null);
  const [telcount, setTelcount] = useState(null);
  const [AccCount, setAccCount] = useState(null);
  const [smId, setsmId] = useState(null);
  const [mId, setmId] = useState(null);
  const [AdId, setAdId] = useState(null);
  const [fId, setFid] = useState(null);
  const [selectedItemsInTable, setSelectedItemsInTable] = useState(null);
  const [itId, setitId] = useState(null);
  const [selectedAddItems, setSelectedAddItems] = useState(null);
  const [loginEmail, setloginEmail] = useState(null);
  const [quotationDetails, setquotationDetails] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [companyName, setcompanyName] = useState(null);
  const [role, setrole] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load stored values from local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authContext')) || {};
    setEmployeeRegId(storedData.EmployeeRegId || null);
    setorgId(storedData.orgId || null);
    setUserId(storedData.userId || null);
    setToken(storedData.token || null);
    setSId(storedData.sId || null);
    settelId(storedData.telId || null);
    settId(storedData.tId || null);
    setoTLId(storedData.oTLId || null);
    setaccId(storedData.accId || null);
    setSelectedDateItem(storedData.SelectedItemDate || null);
    setCount(storedData.count || null);
    settechCount(storedData.techcount || null);
    setSalescount(storedData.salescount || null);
    setTelcount(storedData.telcount || null);
    setAccCount(storedData.AccCount || null);
    setsmId(storedData.smId || null);
    setmId(storedData.mId || null);
    setAdId(storedData.AdId || null);
    setFid(storedData.fId || null);
    setSelectedItemsInTable(storedData.selectedItemsInTable || null);
    setitId(storedData.itId || null);
    setSelectedAddItems(storedData.selectedAddItems || null);
    setloginEmail(storedData.loginEmail || null);
    setquotationDetails(storedData.quotationDetails || null);
    setfirstName(storedData.firstName || null);
    setcompanyName(storedData.companyName || null);
    setrole(storedData.role || null);
    setRefreshKey(storedData.refreshKey || 0);
  }, []);

  // Save state to local storage on change
  useEffect(() => {
    const state = {
      EmployeeRegId,
      orgId,
      userId,
      token,
      sId,
      telId,
      tId,
      oTLId,
      accId,
      SelectedItemDate,
      count,
      techcount,
      salescount,
      telcount,
      AccCount,
      smId,
      mId,
      AdId,
      fId,
      selectedItemsInTable,
      itId,
      selectedAddItems,
      loginEmail,
      quotationDetails,
      firstName,
      companyName,
      role,
      refreshKey,
    };
    localStorage.setItem('authContext', JSON.stringify(state));
  }, [
    EmployeeRegId,
    orgId,
    userId,
    token,
    sId,
    telId,
    tId,
    oTLId,
    accId,
    SelectedItemDate,
    count,
    techcount,
    salescount,
    telcount,
    AccCount,
    smId,
    mId,
    AdId,
    fId,
    selectedItemsInTable,
    itId,
    selectedAddItems,
    loginEmail,
    quotationDetails,
    firstName,
    companyName,
    role,
    refreshKey,
  ]);

  const resetAuth = () => {
    setEmployeeRegId(null);
    setorgId(null);
    setUserId(null);
    setToken(null);
    setSId(null);
    setAdId(null);
    setSelectedItemsInTable(null);
    setitId(null);
    setSelectedAddItems(null);
    setloginEmail(null);
    localStorage.removeItem('authContext');
  };

  return (
    <AuthContext.Provider
      value={{
        EmployeeRegId,
        setEmployeeRegId,
        orgId,
        setorgId,
        userId,
        setUserId,
        token,
        setToken,
        sId,
        setSId,
        AdId,
        setAdId,
        fId,
        setFid,
        selectedItemsInTable,
        setSelectedItemsInTable,
        itId,
        setitId,
        selectedAddItems,
        setSelectedAddItems,
        loginEmail,
        setloginEmail,
        quotationDetails,
        setquotationDetails,
        firstName,
        setfirstName,
        companyName,
        setcompanyName,
        role,
        setrole,
        telId,
        settelId,
        tId,
        settId,
        oTLId,
        setoTLId,
        smId,
        setsmId,
        mId,
        setmId,
        count,
        setCount,
        techcount,
        settechCount,
        salescount,
        setSalescount,
        telcount,
        setTelcount,
        AccCount,
        setAccCount,
        accId,
        setaccId,
        SelectedItemDate,
        setSelectedDateItem,
        refreshKey,
        setRefreshKey,
        resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

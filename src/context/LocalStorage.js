
export const loadInitialState = (initialState) => {
    try {
      const serialState = localStorage.getItem('state') || initialState
      if (serialState === null) {
        return undefined;
      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
};

export const saveState = (state) => {
    try {
      const serialState = JSON.stringify(state);
      localStorage.setItem('state', serialState);
    } catch(err) {
        console.log(err);
    }
};



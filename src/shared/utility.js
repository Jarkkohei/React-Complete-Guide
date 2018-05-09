export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => { 
    let isValid = true;

    if(!rules) {
        return true;
    }

    //  Not empty
    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    //  Minimum length
    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid; 
    }

    //  Maximum length
    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}
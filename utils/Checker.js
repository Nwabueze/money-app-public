let checkText = (text) => {
    if(!text){
        return false;
    }

    if(text.length < 2){
        return false;
    }
    return true;
}

let checkEmail = (email) => {
    if(!email){
        return false;
    }
    var isEmail = email.match(/(\w+)(@)(\w+)(\.)(\w+)/) != null;
    if(!isEmail){
        return false;
    }
    return true;
}

let checkPassword = (passw) => {
  if(!passw){
      return false;
  }

  if(passw.length < 4){
      return false;
  }
  return true;
}

export default { checkEmail, checkPassword, checkText };
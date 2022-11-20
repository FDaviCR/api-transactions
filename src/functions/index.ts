const regexHasNumber = /[0-9]/;
const rehexHasCapitalLetter = /[A-Z]/;


export const checkPassword = async (password: string) => {
  let hasNumber:boolean = regexHasNumber.test(password);
  let hasCapitalLetter:boolean = rehexHasCapitalLetter.test(password);

  if(hasNumber && hasCapitalLetter){
    return true;
  }else{
    return false;
  }
}
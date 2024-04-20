class Client {
  constructor(id, name, surname, phoneNumber, email, debt, details) {
    this.id = id;
    this.name = name;
    this.surname=surname;
    this.phoneNumber=phoneNumber;
    this.email=email;
    this.debt=debt;
    this.extraDetails=details;
  }
  getId(){
    return this.id;
  }
  getName(){
    return this.name;
  }
  getSurname(){
    return this.surname;
  }
  getPhoneNumer(){
    return this.phoneNumber;
  }
  getEmail(){
    return this.email;
  }
  getDebt(){
    return this.debt;
  }
  getDetails(){
    return this.extraDetails;
  }
  setId(newId){
    this.id=newId;
  }
  setName(newName){
    this.name=newName;
  }
  setSurname(newSurname){
    this.surname=this.newSurname;
  }
  setPhoneNumer(newPhoneNumber){
    this.phoneNumber=newPhoneNumber;
  }
  setEmail(newEmail){
    this.email=newEmail;
  }
  setDebt(newSUm){
    this.debt=newSUm;
  }
  setDetails(newDetails){
    this.details=newDetails;
  }

}
module.exports=Client;
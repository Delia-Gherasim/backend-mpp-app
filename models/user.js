class User {
  constructor(id, name, surname, password, email, position) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.email = email;
    this.position = position;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getSurname() {
    return this.surname;
  }
  getPassword() {
    return this.password;
  }
  getEmail() {
    return this.email;
  }
  getPosition() {
    return this.position;
  }
  setId(newId) {
    this.is = newId;
  }
  setName(newName) {
    this.id = newName;
  }
  setSurname(newSurname) {
    this.surname = newSurname;
  }
  setPassword(newPassword) {
    this.password = newPassword;
  }
  setEmail(newEmail) {
    this.email = newEmail;
  }
  setPosition(newPosition) {
    this.position = newPosition;
  }
}
module.exports = User;

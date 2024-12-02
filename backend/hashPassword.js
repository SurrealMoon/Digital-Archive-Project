const bcrypt = require('bcryptjs');

// Şifreyi hashlemek için fonksiyon
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Hashed Password:', hashedPassword);
};

// Hashlenecek şifre
const plainPassword = '1234';

hashPassword(plainPassword);

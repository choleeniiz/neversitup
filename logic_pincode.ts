const validatePincode = (pincode) => {
  let countDuplicate = 0
  if (typeof pincode !== 'string' || pincode.length < 6) {
    return false;
  }

  for (let i = 0; i < pincode.length - 1; i++) {
    // input จะต้องกันไม่ให้มีเลขซ้ำติดกันเกิน 2 ตัว
    if (+pincode[i] === +pincode[i + 1] && +pincode[i + 1] === +pincode[i + 2]) {
      return false
    }

    //input จะต้องกันไม่ให้มีเลขเรียงกันเกิน 2 ตัว
    if (+pincode[i] + 1 === +pincode[i + 1] && +pincode[i + 1] + 1 === +pincode[i + 2] && +pincode[i + 2] + 1 === +pincode[i + 2] + 1) {
      return false
    }
    //input จะต้องกันไม่ให้มีเลขเรียงกันเกิน 2 ตัว แบบมากไปน้อย
    if (+pincode[i] - 1 === +pincode[i + 1] && +pincode[i + 1] - 1 === +pincode[i + 2]) {
      return false
    }

    //input จะต้องกันไม่ให้มีเลขชุดซ้ำ เกิน 2 ชุด
    if (+pincode[i] === +pincode[i + 1]) {
      countDuplicate++
      if (countDuplicate >= 3) {
        return false
      }
    }
  }
  return true;
}

console.log(validatePincode("441652")); // true


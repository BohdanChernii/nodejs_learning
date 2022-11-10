function studentBuilder(name, age) {
  return {
    name,
    age,
    sleep: () => {
      console.log('I wanna sleep');
    }
  }
}

module.exports = {
  studentBuilder
}

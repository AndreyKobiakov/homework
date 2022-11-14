// Release 0
let student = {
    firstName: 'Petr',
    lastName: 'Perviy',
};
student.firstName = 'Petya';
delete student.firstName;
console.log(student);
// Release 1
let group =[]
group.push(student)
group.push('firstName: Vasya, lastName: Petrov') //не совсем понял как нужно было просто запушить нового 
// студента или создать объект с новым студентом и запушить в массив поэтому 1го так другого так... или как то еще...
student.firstName2 = 'Ivan';
student.lastName2 = 'Velikiy';
// ну и можно было каждого отдельно через student.lastName и т.д.
console.log(group)
class CommonJS {
    static FormatDOB(dob) {
        let dateOfBirth = new Date(dob);
        let date = dateOfBirth.getDate();
        let month = dateOfBirth.getMonth() + 1;
        let year = dateOfBirth.getFullYear();
        date = (date < 10 ? `0${date}` : date);
        month = (month < 10 ? `0${month}` : month);
        dateOfBirth = `${date}/${month}/${year}`;
        return dateOfBirth;
    }
}
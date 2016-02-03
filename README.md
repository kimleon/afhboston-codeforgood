afhboston-codeforgood
==========
Simple interface to assist streamlining the report card entering process at Artists for Humanity

**filepicker.io API key needed before running**


Running Locally:
```sh
npm install
mongod
```
& in a new tab:
```sh
npm start
```
then navigate to http://localhost:3000/ in your browser

To Use:
1. Enter School Year and Period (1/2/3/4)
2. Upload the Student Name to Student Salesforce ID csv and School Name to School Salesforce ID csv, which should have the following formats (1st row is labels, 2nd on are entries):

|  Full Name   |  First Name  |  Last Name  |  Contact ID  |
| ------------ | ------------ | ----------- | ------------ |
| John Doe     | John         | Doe         | 003C000001Yp |
| Jane Smith   | Jane         | Smith       | 003C000002Hq |
| Rachel Green | Rachel       | Green       | 003C000001Td |

|  Organization Name  |  Organization ID  | 
| ------------------- | ----------------- | 
| ABHS                | 003C000001Yp      | 
| Apple High School   | 003C000002Hq      |
| Boston Academy      | 003C000001Td      | 

3. Click "Start New Term" to redirect to the student page
4. Click "Add New Student" for each new student
5. Once all the students are added, click "Download CSV"

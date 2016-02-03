afhboston-codeforgood
==========
Simple interface to assist streamlining the report card entering process at Artists for Humanity

**filepicker.io API key needed before running**

replace [REMOVED] with your API key in the two instances of data-fp-apikey="[REMOVED]" in public/templates/TermsView.html

#### Running Locally:
```sh
npm install
mongod
```
& in a new tab:
```sh
npm start
```
then navigate to http://localhost:3000/ in your browser


#### To Use:

note that **clicking refresh at any time will erase all data**


1. Enter School Year and Period
2. Upload the Student Name to Student Salesforce ID csv and School Name to School Salesforce ID csv, which should have the following formats (1st row is labels, 2nd on are entries):

    |  Full Name   |  First Name  |  Last Name  |  Contact ID  |  School ID  |
    | ------------ | ------------ | ----------- | ------------ | ----------- |
    | John Doe     | John         | Doe         | 003C000001Yp | 135786      |
    | Jane Smith   | Jane         | Smith       | 003C000002Hq | 234567      |
    | Rachel Green | Rachel       | Green       | 003C000001Td | 345656      |

    |  Organization Name  |  Organization ID  | 
    | ------------------- | ----------------- | 
    | ABHS                | 003C000001Yp      | 
    | Apple High School   | 003C000002Hq      |
    | Boston Academy      | 003C000001Td      | 

3. Click "Start New Term" to redirect to the student page
4. Click "Add New Student" for each new student
  4. enter the student's name, school, class names, and grades information (grades should be entered in the same order as their corresponding classes)
  4. the salesforce IDs, school ID, course level, and course type will be filled in automatically
  4. there is a student counter at the top left of the page if you'd like to check that you've entered all the students
5. Once all the students are added, click "Download CSV"


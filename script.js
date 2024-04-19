// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {

    let result=[];

    if(ag.course_id == null){
      throw new Error(`the assigment group doesn't releated to course`)
    }

    if(ag.course_id == course.course_id){
      throw new Error(`the assigment group releated to different course`)
    }

    let learner = [];

    LearnerSubmissions.forEach(element => {
      
      if(!learner.includes(element.learner_id)){
      learner.push(element.learner_id);
      }
      
    });

    // console.log(learner);

    let validAssigment = [];
    let points = [];
    let submitted = [];
    
      ag.assignments.forEach(assignments => {
        let date1 = new Date();
        let date2 = new Date(assignments.due_at);

        if(date2 <= date1){
          validAssigment.push(assignments.id);
          points.push(assignments.points_possible);
          submitted.push(assignments.due_at);
        }
      });

    // console.log(validAssigment);

    learner.forEach(element => {
      let obj={
        id: element
      }

      let totalScore=0;
      let totalPoints=0;

      LearnerSubmissions.forEach(LearnerSubmissions => {
        if(LearnerSubmissions.learner_id === element){
          if(validAssigment.includes(LearnerSubmissions.assignment_id)){

            let date1 = new Date(LearnerSubmissions.submission.submitted_at);
            let date2 = new Date(submitted[validAssigment.indexOf(LearnerSubmissions.assignment_id)]);
            let score;
            let point = points[validAssigment.indexOf(LearnerSubmissions.assignment_id)];
            if(date2 < date1){
              score= LearnerSubmissions.submission.score *(90/100);
            }
            else{
              score= LearnerSubmissions.submission.score;
            }

            totalScore += score;
            totalPoints += point;


          obj[LearnerSubmissions.assignment_id]= score/point;
          }

        }

        
      });
      try{
        if (totalPoints === 0) {
          throw new Error("points_possible cannot be 0");
      }
      obj.avg = totalScore / totalPoints;
            // console.log(obj);
            result.push(obj);
      }
      catch(error){
        console.error("An error occurred:", error.message);
      }


      
    });

    // here, we would process this data to achieve the desired result.
    // const result = [
    //   {
    //     id: 125,
    //     avg: 0.985, // (47 + 150) / (50 + 150)
    //     1: 0.94, // 47 / 50
    //     2: 1.0 // 150 / 150
    //   },
    //   {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833 // late: (140 - 15) / 150
    //   }
    // ];

    // console.log(result);
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);
  
 
  
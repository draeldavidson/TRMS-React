import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import Axios from "axios";
import ManagerHeader from "./Headers/ManagerHeader"
import moment from "moment";
import Header from "../Header";
import Footer from "../Footer";


const Manager = () => {

//THESE STATES ARE USED TO UPDATE THE FORM WITH A NEW COMMENT
// WHEN WE FIGURE OUT HOW WE WANT THE APPROVED OR DENIED TO BE INPUTTED (CHARVAR OR TRUE OR FALSE?) WE CAN MAKE ANOTHER STATE HERE.
    const [newSuperMessage, setNewSuperMessage] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newBenefitsCoor, setNewBenefitsCoor] = useState("");

 //THIS STATE WILL GRAB THE DATA THAT WE WANT TO DISPLAY
    const [reimbursementForm, setReimbursementForm] = useState([]);


    
//THIS GET REQUEST DEFINES THE setReimbursementForm TO GRAB ALL THE DATA THAT THE GET REQUEST MAKES
//THE QUERY FOR THIS GET REQUEST IS 'SELECT * FROM formdetails ' CAN BE CHANGE TO SAY WHERE empid = $1 
//BUT I DONT KNOW HOW TO SEND THE CORRECT empid INTO THE QUERY

useEffect(() =>{
  Axios.get("http://localhost:3001/departmenthead").then((response) => {
          setReimbursementForm(response.data);
        });
      });
  // THIS PUT REQUESTS UPDATES THE REQUEST BASED ON THE id SO FIRST IT GETS THE id ON THE REQUEST YOURE UPDATING 
  //THEN IT UPDATES THE COMMENT SECTION. NOTICT THAT IT SAYS comments: newComments BECAUSE THAT IS THE CHANGE
  //WE CAN ADD ANOTHER CHANGE FOR APPROVE OR DENNIED THE EXACT SAME WAY.
  // THE QUERY IS 'UPDATE formdetails SET comments=$2 WHERE id=$1'

      const updateComments = (id) => {
        Axios.put(`http://localhost:3001/manager/${id}`, { id: id ,  supermessage: newSuperMessage, status: newStatus, benefitscoor: newBenefitsCoor,}).then(
          (response) => {
            setReimbursementForm(
                reimbursementForm.map((val) => {
                return val.id === id
                  ? {
                      id: val.id,
                      fullname: val.fullname,
                      dept: val.dept,
                      title: val.title,
                      eventname: val.eventname,
                      facilitator: val.facilitator,
                      startdate: val.startdate,
                      enddate: val.enddate,
                      description: val.description,
                      total: val.total,
                      certificationname: val.certificationname,
                      empmessage: val.empmessage,
                      empsignature: val.empsignature,
                      todaysdate: val.todaysdate,
                      depthead: val.depthead,

                      status: newStatus,
                      benefitscoor: newBenefitsCoor,
                      supermessage: newSuperMessage,
                    }
                  : val;
              })
            );
          }
        );
      };
















    return (
        <>
        <Header />
        <ManagerHeader/>     
     <div className= "container" id="container1">
       <h3> Hello and Welcome To Your Manager Dashboard </h3>
       <p>GUIDELINES FOR RESPONDING TO REIMBURSMENT REQUESTS</p>
         
       <p>Ensure that forms are field out entirely or push them back to the employee.
           Reference the current contract for a thorough explanation of course/ job title 
           authorization. If you have any questions or concerns please speak with your Department 
           Trainer. All rejection require a comment explaining why. Feel free to contact HR via email prior to any
            rejections to ensure the rejection is not erroneous.
         </p>
     </div>        
        <div className="App">
        <div className="information">
            
{/* button might want to just have it load automatically with the page or make it a tab? */}
      {/* <button className="pending" onClick={getForm}>Pending Requests</button> */}
      {/* just a link to not get stuck */}

        {/* THIS IS HOW THE GET REQUEST IS DIPLAYED THEY CAN BE ON THE SAME LINE OR IN A PARAGRAPH FORM I JUST LISTED THEM TO TELL THEM APART*/}
        {reimbursementForm.map((val, key) => {
          return (

            
            <div className="form">

                <br></br>
                
                <blockquote
                className="p-4"
                style={{
                  fontSize: '1.0rem',
                  fontStyle: 'italic',
                  border: '2px dotted #1a1a1a',
                  lineHeight: '1.5',
                }}
              >
                <h5>Date Submitted: {moment(val.todaysdate).format("MM/DD/YYYY")}</h5>
                <p><b>{val.fullname}: </b>{val.dept}, {val.title} <br></br>
                <b>Details of course/event:</b> <br></br>
                Dates Attended: {moment(val.startdate).format("MM/DD/YYYY")}-{moment(val.enddate).format("MM/DD/YYYY")} <br></br>
                <b>{val.eventname}</b> by. <b>{val.facilitator}</b>: <br></br>
                "{val.description}"<br></br>
                {val.certificationname} <b>Total: ${val.total}</b><br></br>
                Employee Comments: {val.empmessage} <br></br>
                <p>-------------------------------------------------------------------------------------------------</p>
                <b>Status: {val.status}</b><br></br>
                Supervisor Review: Yes <br></br>
                Manager Review: {val.depthead}<br></br>
                Benefits Coordinator Review: {val.benefitscoor} <br></br>
                <b>Admin Comments: {val.supermessage}</b>
                </p>
                <p>-------------------------------------------------------------------------------------------------</p>
              </blockquote>
              <div className= "containersml2">

              <div>
              <h6>Enter Pending, Approved or Denied?</h6>
            <input className="update"
                type="text"
                placeholder="REQUIRED"
                required
                onChange={(event) => {
                  setNewStatus(event.target.value);
                }}
              />
                <h6>Does The Benefits Coordinator Need to Review?</h6>
            <input className="update"
                type="text"
                placeholder="Yes or No"
                required
                onChange={(event) => {
                    setNewBenefitsCoor(event.target.value);
                }}
              />
                <h6>Leave a Comment</h6>
              <textarea rows="3" cols="50" 
                type="text"
                placeholder="REQUIRED"
                required
                onChange={(event) => {
                  setNewSuperMessage(event.target.value);
                }}
              />
              
              <button className="button" 
                onClick={() => {
                  updateComments(val.id);
                }}
              >
                Update
              </button>

            </div>
</div>


              </div>
              
               );
            })}


</div>

  </div>
  <Footer />

  </>



    )
}

export default Manager
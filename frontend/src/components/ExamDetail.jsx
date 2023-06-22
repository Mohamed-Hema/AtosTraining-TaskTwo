import { useEffect, useState } from "react";
import axios from "axios";

const ExamDetails = ({ examId }) => {
  const [examDefinition, setExamDefinition] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        // Fetch exam instance
        // Fetch exam definition
        const definitionResponse = await axios.get(
          `http://localhost:5000/api/getexams/${examId}`
        );
        const examDefinitionData = definitionResponse.data.examDefinition;
        setExamDefinition(examDefinitionData);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchExamDetails();
  }, [examId]);

  if (!examInstance || !examDefinition) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Exam Details</h2>
      <p>Exam Name: {examInstance.examname}</p>
      <p>Exam Definition ID: {examDefinition.examdefinationid}</p>
      {/* Display other exam details as needed */}
    </div>
  );
};

export default ExamDetails;

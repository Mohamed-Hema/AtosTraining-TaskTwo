import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams data from the backend when the component mounts
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/exams');
        const examsData = response.data;
        setExams(examsData);
      } catch (error) {
        console.log('Failed to fetch exams:', error);
        // Handle error scenario, display error message, etc.
      }
    };

    fetchExams();
  }, []);

  return (
    <div>
      <h1>Exams</h1>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>
            <Link to={`/exams/${exam.id}`}>{exam.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exams;

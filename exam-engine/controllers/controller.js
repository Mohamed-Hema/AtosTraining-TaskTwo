const pool = require("../db/db");
const queries = require("../db/queries");

///Exam Creation
const createExamDefinition = async (req, res) => {
  try {
    const { name, questions } = req.body;

    const checkExamQuery = await pool.query(queries.checkExamExists, [name]);
    if (checkExamQuery.rows.length) {
      return res.send("Exam already exists.");
    }

    const addExamQuery = await pool.query(queries.addExamDefinition, [
      name,
      questions,
    ]);
    res.status(201).send("Exam Definition Created Successfully!");
  } catch (error) {
    console.error("Error creating exam definition:", error);
    res.status(500).send("Error creating exam definition");
  }
};

const createExamInstance = async (req, res) => {
  try {
    const { examDefinitionId, createdBy, takenBy, status } = req.body;

    if (!examDefinitionId) {
      return res.status(400).send("Exam Definition ID is required");
    }

    const createInstanceQuery = await pool.query(queries.createExamInstance, [
      examDefinitionId,
      createdBy,
      takenBy,
      status,
    ]);

    res.status(201).send("Exam Instance Created Successfully!");
  } catch (error) {
    console.error("Error creating exam instance:", error);
    res.status(500).send("Error creating exam instance");
  }
};

//Getting Exams

const getExams = (req, res) => {
  pool.query(queries.getExams, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getExamById = (req, res) => {
  const id = req.params.id;
  // Fetch exam instance
  pool.query(queries.getExamById, [id], (error, instanceResults) => {
    if (error) throw error;

    // Fetch exam definition
    const examDefinition = instanceResults.rows[0];
    res.status(200).json({ examDefinition });

    // pool.query(
    //   queries.getExamDefinitionById,
    //   [examDefinitionId],
    //   (error, definitionResults) => {
    //     if (error) throw error;

    //     const examInstance = instanceResults.rows[0];
    //     const examDefinition = definitionResults.rows[0];

    //     res.status(200).json({ examInstance, examDefinition });
    //   }
    // );
  });
};

const getExamInstanceById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getExamInstanceById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  createExamDefinition,
  getExams,
  getExamById,
  createExamInstance,
  getExamInstanceById,
};

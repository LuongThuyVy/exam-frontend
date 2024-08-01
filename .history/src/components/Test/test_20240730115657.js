/* Test.css */
.question-status-table {
  border-collapse: separate; /* Ensure space between cells */
  border-spacing: 10px; /* Space between cells */
}

.question-status-table td {
  cursor: pointer;
  padding: 12px; /* Increase padding for better spacing */
  text-align: center;
  border: none; /* Remove border */
  width: 50px; /* Fixed width for uniform cell size */
  height: 50px; /* Fixed height for uniform cell size */
  color: #ffffff; /* Set text color to white */
  font-weight: bold; /* Make text bold for better visibility */
  display: flex; /* Use flexbox for centering content */
  align-items: center; /* Vertically center content */
  justify-content: center; /* Horizontally center content */
}

.bg-success {
  background-color: #28a745; /* Greenish background for answered questions */
}

.bg-danger {
  background-color: #dc3545; /* Reddish background for unanswered questions */
}

.current-question {
  background-color: #007bff; /* Highlight color for current question */
  color: #ffffff; /* White text color for visibility */
}

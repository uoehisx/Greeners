const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fff",
  },
  logo: {
    width: "100px",
    marginBottom: "1px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "0px",
  },
  username: {
    marginTop: "0px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: "20px",
    textAlign: "center",
  },
  badgeSection: {
    width: "200px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  badgeBox: {
    width: "200px",
    height: "100px",
    backgroundColor: "#2E7D32",
    borderRadius: "10px",
  },
  logoutButton: {
    width: "200px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    marginBottom: "10px",
  },
  withdrawButton: {
    width: "200px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#D32F2F",
    color: "#fff",
    cursor: "pointer",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "250px",
  },
  confirmButton: {
    backgroundColor: "#D32F2F",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "#336633",
    color: "#fff",
    border: "none",
    padding: "10px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default styles;

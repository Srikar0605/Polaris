function PageWrapper({ children }) {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {children}
    </main>
  );
}

export default PageWrapper;

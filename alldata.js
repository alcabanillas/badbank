function AllData(){
  const ctx = React.useContext(UserContext);
  return (
    <div>
    <h1>AllData</h1>
    <span>{JSON.stringify(ctx)}</span>
    </div>
  )
}
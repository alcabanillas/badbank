function Deposit(){
  const ctx = React.useContext(UserContext);
  return (
    <div>
    <h1>Deposit</h1>
    <span>{JSON.stringify(ctx.users)}</span>
    </div>
  )
}
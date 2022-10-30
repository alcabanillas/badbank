function Balance(){
  const ctx = React.useContext(UserContext);
  return (
    <div>
    <h1>Balance</h1>
    <span>{JSON.stringify(ctx.users)}</span>
    </div>
  )
}
import TextField from "@material-ui/core/TextField";

export default function DateTime() {
  return (
    <form noValidate>
      <TextField
        id="datetime-local"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

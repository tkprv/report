import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Tabproblem({ rowsData, deleteTableRows, handleChange }) {
    return (
        rowsData.map((data, index) => {
            const { problem } = data
            return (
                <div key={index}>
                    <InputText type="text" value={problem} onChange={(evnt) => (handleChange(index, evnt))} name="problem" className="form-control" placeholder="ปัญหา/อุปสรรค" style={{ marginTop: "1em", width: '35em' }} />
                    <Button className="p-button-danger" onClick={() => (deleteTableRows(index))} style={{ width: '3em', marginLeft: '1em' }}>x</Button>
                </div>
            )

        })
    )

}

export default Tabproblem;
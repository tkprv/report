import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Tabdetailreport({ rowsData, deleteTableRows, handleChange }) {
    return (
        rowsData.map((data, index) => {
            const { detail } = data
            return (
                <div key={index}>
                    <InputText type="text" value={detail} onChange={(evnt) => (handleChange(index, evnt))} name="detail" className="form-control" placeholder="รายละเอียดความก้าวหน้า" style={{ marginTop: "1em", width: '35em' }} />
                    <Button className="p-button-danger" onClick={() => (deleteTableRows(index))} style={{ width: '3em', marginLeft: '1em' }}>x</Button>
                </div>
            )

        })
    )

}

export default Tabdetailreport;
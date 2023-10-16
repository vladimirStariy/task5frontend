import Form from "react-bootstrap/Form";

const LocaleSelect = () => {
    return <>
        <Form.Select className="mt-3">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
    </>
}

export default LocaleSelect;
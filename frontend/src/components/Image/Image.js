import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LtImage() {
    return (
        <div className="bg-black col-md-12">
            <Image
                className="p-5 pb-5 mx-auto d-block img-fluid"
                src="https://litethinking.com/static/media/Logo_Lite_Thinking_Sin_Fondo.0aa257fa.png"
                alt="Lending Front Logo"
            ></Image>
        </div>
    );
}

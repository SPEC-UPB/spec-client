import React, {useState} from "react";

export default function Iframe() {
    const [urlVideo, seturlVideo] = useState("");
  return (
    <React.Fragment>
      <button
        onClick={() => seturlVideo("https://www.youtube.com/embed/5cVpl1WGmJA")}
        type="button"
        class="btn btn-info"
        data-toggle="modal"
        data-target="#modalYT"
      >
        ¿Qué es la energía solar?
      </button>
      <button
        onClick={() => seturlVideo("https://www.youtube.com/embed/mmDFW8vJw7U")}
        type="button"
        class="btn btn-info"
        data-toggle="modal"
        data-target="#modalYT"
      >
        ¿Cómo se genera?
      </button>
      <div
        class="modal fade"
        id="modalYT"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-body mb-0 p-0">
              <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                <iframe
                  class="embed-responsive-item"
                  src={urlVideo}
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="modal-footer justify-content-center">
              <span class="mr-4 text-muted">Tomado de: {urlVideo}</span>
              <button
                type="button"
                class="btn btn-outline-primary btn-rounded btn-md ml-4"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

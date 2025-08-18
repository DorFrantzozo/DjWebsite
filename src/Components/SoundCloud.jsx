import React from "react";

const SoundCloud = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-14">
        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2154646206&color=%23181c20&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          style={{ border: "none", overflow: "hidden", borderRadius: "12px" }}
        ></iframe>

        <div
          style={{
            fontSize: "10px",
            color: "#cccccc",
            lineBreak: "anywhere",
            wordBreak: "normal",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontFamily:
              "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
            fontWeight: 100,
            marginTop: "4px",
          }}
        >
          <a
            href="https://soundcloud.com/dor-fr"
            title="Dor fr"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#cccccc", textDecoration: "none" }}
          >
            Dor fr
          </a>{" "}
          ·{" "}
          <a
            href="https://soundcloud.com/dor-fr/8bfb845f-4a64-49ba-b04d-9af6536296ea"
            title="Afternoon Afro House"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#cccccc", textDecoration: "none" }}
          >
            Afternoon Afro House
          </a>
        </div>
      </div>
    </>
  );
};

export default SoundCloud;

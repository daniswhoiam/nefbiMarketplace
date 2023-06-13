import React from 'react';

const Qualitaetskriterien = () => {
  return (
    <>
      <h1>Qualitätskriterien</h1>
      <div>
        <h2>Generell</h2>
        <div>
          <div>
            <img src="" alt="" />
            <div>
              <h3>Relevanz</h3>
              <p>
                Die Inhalte werden sorgfältig recherchiert und orientieren sich
                an aktuellen Fachdebatten und wissenschaftlichen Erkenntnissen
              </p>
            </div>
          </div>
          <div>
            <img src="" alt="" />
            <div>
              <h3>Keine Diskriminierung</h3>
              <p>
                Konform sind alle Inhalte, die Diskriminierung und Hetze
                ausschließen.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Nach Format</h2>
        <div>
          <FormatQualitaet
            title="Fachtexte"
            bullets={[
              'Literatur- und Quellenangaben',
              'Aktualität (Forschungsstand)',
              'Expert:in Frühe Bildung (Theorie und Praxis)',
              'Veröffentlichung auf einschlägiger Homepage',
              'Freier Zugang',
            ]}
          />
        </div>
      </div>
    </>
  );
};

const FormatQualitaet = ({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) => {
  return (
    <div>
      <h3>{title}</h3>
      {bullets.map(val => {
        return <p>{val}</p>;
      })}
    </div>
  );
};

export default Qualitaetskriterien;

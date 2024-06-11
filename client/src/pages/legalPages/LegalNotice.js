import React from 'react';

const LegalNotice = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <h2 className="text-3xl font-bold mb-6">Mentions Légales</h2>
            <section className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Éditeur du site :</h3>
                <p>
                    Nom de l'entreprise : Com d Roy <br />
                    Adresse : 288 Boulevard de la République, 33510 Andernos-les-Bains <br />
                    Téléphone : O5 56 82 04 23<br />
                    Email : contact@comdroy.com <br />
                    SIRET : 81906759600018 <br />
                    Directeur de la publication : ---
                </p>
            </section>
            <section className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Hébergement :</h3>
                <p>
                    Nom de l'hébergeur : --- <br />
                    Adresse : --- <br />
                    Téléphone : ---
                </p>
            </section>
            <section className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Propriété intellectuelle :</h3>
                <p>
                    Tous les contenus présents sur ce site (textes, images, logos, etc.) sont la propriété exclusive de Com d Roy, sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord écrit de Com d Roy.
                </p>
            </section>
            <section className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Responsabilité :</h3>
                <p>
                    Com d Roy s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Com d Roy décline toute responsabilité en cas d'erreur, d'inexactitude ou d'omission dans ces informations.
                </p>
            </section>
            <section className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Liens hypertextes :</h3>
                <p>
                    Les liens hypertextes présents sur le site orientant les utilisateurs vers d'autres sites internet n'engagent pas la responsabilité de Com d Roy quant au contenu de ces sites.
                </p>
            </section>
            <section className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Données personnelles :</h3>
                <p>
                    Pour plus d'informations sur la collecte et le traitement de vos données personnelles, veuillez consulter notre <a href="/privacypolicy" className="text-secondary underline">Politique de Confidentialité</a>.
                </p>
            </section>
        </div>
    );
};

export default LegalNotice;

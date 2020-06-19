import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './../legal.scss';

@Component
export class PrivacyPolicyPage extends Vue {
  goBack(): void {
    this.$router.go(-1);
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['legal']}>
        <div>
          <div class={Styles['legal__title']}>Datenschutzerklärung</div>
          <div onClick={() => this.goBack()} class={Styles['close-button']}>
            <v-icon class={Styles['icon']}>fa-times</v-icon>
          </div>
        </div>
        <p class={Styles['legal__paragraph']}>
          Der Schutz Ihrer Daten ist ein wichtiges Anliegen der Geschäftsleitung von WirVonHier. Wir behandeln Ihre
          personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
          Datenschutzerklärung. Wenn Sie diese Website oder unsere App benutzen, werden verschiedene personenbezogene
          Daten erhoben. Im Folgenden informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten. Die
          Datenschutzerklärung finden Sie jederzeit auf unserer Website und in der App.
        </p>
        <div class={Styles['legal__section']}> Für die Verarbeitung Verantwortlicher</div>
        <p class={Styles['legal__paragraph']}>Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist die:</p>
        <p class={Styles['legal__paragraph']}>
          WirVonHier
          <br /> Schell_Vomhof_Römmelt_Schlott_Bein_Lippl_Römmelt_Wesseler_Held GbR (im Folgenden auch „wir“ oder „uns“)
        </p>
        <p class={Styles['legal__paragraph']}>
          Luisenstr. 34
          <br /> 60316 Frankfurt
        </p>
        <p class={Styles['legal__paragraph']}>
          Inhaber: Alexander Schell, Anna Vomhof, Erik Römmelt, Helen Schlott, Kevin Bein, Louisa Lippl, Marc Römmelt,
          Moritz Wesseler, Helena Elisabeth Held
        </p>
        <p class={Styles['legal__paragraph']}>
          Telefon: +49 (0) 160 8218489
          <br /> E-Mail: <a href="mailto:office@wirvonhier.net">office@wirvonhier.net</a>
          <br /> Internet: wirvonhier.net
        </p>
        <div class={Styles['legal__section']}> Ihre Rechte</div>
        <p class={Styles['legal__paragraph']}>
          Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten
          personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung
          dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit
          über die in Ziffer 1. angegebenen Kontaktdaten an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei
          der zuständigen Aufsichtsbehörde zu.
        </p>
        <p class={Styles['legal__paragraph']}>
          Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </p>
        <p class={Styles['legal__paragraph']}>
          Erfolgt eine Datenverarbeitung auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, können Sie
          diese jederzeit widerrufen, ohne dass hierdurch die Rechtmäßigkeit der aufgrund der Einwilligung bis zum
          Widerruf erfolgten Verarbeitung berührt wird.
        </p>
        <div class={Styles['legal__section']}> Datenverarbeitungszwecke</div>
        <div class={Styles['legal__subsection']}>3.1 Datenverarbeitung bei Anlegung eines Händlerprofils</div>
        <p class={Styles['legal__paragraph']}>
          Entscheiden Sie sich zur Anlegung eines Händlerprofils, erheben wir hierzu grundlegende Anmeldedaten. Hierzu
          gehören unter anderem der Name Ihres Ladens, der Standort, eine kurze Beschreibung des Ladens und Ihre
          Kontaktdaten. Bei Nutzung der WirVonHier App besteht die Möglichkeit, dem Profil Fotos und Videos ihres Ladens
          hinzuzufügen.
        </p>
        <p class={Styles['legal__paragraph']}>
          Soweit Sie sich entscheiden über die App mit anderen Nutzern zu kommunizieren, erfolgt eine entsprechende
          Verarbeitung Ihrer Kontaktdaten.
        </p>
        <p class={Styles['legal__paragraph']}>
          Die Datenverarbeitung erfolgt zum Zwecke der Vertragsanbahnung oder Vertragsdurchführung gemäß Art. 6 Abs. 1
          lit. b DSGVO.
        </p>
        <div class={Styles['legal__subsection']}>3.2 Datenverarbeitung bei Nutzung der App</div>
        <p class={Styles['legal__paragraph']}>
          Eine Nutzung unserer App ist Nicht-Händlern auch ohne Anlegung eines Profils bzw. Registrierung möglich.
          Hierbei erfolgt eine Erhebung Ihres Standorts, um Ihnen Läden in Ihrer Nähe anzuzeigen.
        </p>
        <p class={Styles['legal__paragraph']}>
          Entscheiden Sie sich, Kontakt zu anderen Nutzern bzw. Ladeninhabern aufzunehmen, werden Ihre Kontaktdaten
          entsprechend verarbeitet.
        </p>
        <p class={Styles['legal__paragraph']}>
          Eine Datenverarbeitung erfolgt auf Grundlage von Artikel 6 Abs. 1 lit. b zum Zwecke der Vertragsdurchführung
          und unserer berechtigten Interessen an der Bereitstellung unserer Dienste nach Art. 6 Abs. 1 lit f.
        </p>
        <div class={Styles['legal__subsection']}>3.3 Werbung</div>
        <p class={Styles['legal__paragraph']}>
          Eine Nutzung zu werblichen Zwecken erfolgt nur unter der Bedingung Ihrer zuvor erteilten Einwilligung und auf
          Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten
          Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter gespeichert und nach der Abbestellung des
          Newsletters gelöscht.
        </p>
        <div class={Styles['legal__subsection']}>3.4 Server Log-Files</div>
        <p class={Styles['legal__paragraph']}>
          Bei rein informatorischer Nutzung unserer Webseite, erfolgt eine Erhebung und Speicherung von Informationen in
          so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
        </p>
        <ul>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <p class={Styles['legal__paragraph']}>
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten
          erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der technisch
          fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst
          werden.
        </p>
        <div class={Styles['legal__section']}> Cookies</div>
        <p class={Styles['legal__paragraph']}>
          Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine
          Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
        </p>
        <p class={Styles['legal__paragraph']}>
          Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres
          Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen.
          Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
        </p>
        <p class={Styles['legal__paragraph']}>
          Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur
          im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das
          automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann
          die Funktionalität dieser Website eingeschränkt sein.
        </p>
        <p class={Styles['legal__paragraph']}>
          Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter
          Funktionen (z. B. Warenkorbfunktion) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
          gespeichert. Wir haben ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien
          und optimierten Bereitstellung unserer Dienste. Soweit andere Cookies zu statistischen oder analytischen
          Zwecken gespeichert werden, geschieht dies nur auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a
          DSGVO.
        </p>
        <div class={Styles['legal__section']}> Datenspeicherung</div>
        <p class={Styles['legal__paragraph']}>
          Ihre Daten werden nur solange verarbeitet, wie dies für die beschriebenen Verarbeitungszwecke erforderlich
          ist. Unter Umständen sind wir aus steuer- und handelsrechtlichen Gründen angehalten, Daten länger
          aufzubewahren.
        </p>
        <div class={Styles['legal__section']}> Datenübermittlung</div>
        <p class={Styles['legal__paragraph']}>
          Eine Datenübermittlung an Dritte erfolgt nur, soweit dies für die Bereitstellung unserer Dienste erforderlich
          ist. Entscheiden Sie sich beispielsweise zur Kontaktaufnahme mit anderen Nutzern unserer App, erfolgt unter
          Umständen eine Datenübermittlung an den jeweiligen Kommunikationsdienstbetreiber (WhatsApp / Twitter / u.ä).
        </p>
        <div class={Styles['legal__section']}> Internationale Datenübermittlung</div>
        <p class={Styles['legal__paragraph']}>
          Wir übermitteln Ihre Daten, sofern nicht anderweitig oben angegeben, nicht an Drittländer oder internationale
          Organisationen außerhalb der Europäischen Union / des Europäischen Wirtschaftsraums.
        </p>
        <div class={Styles['legal__section']}> Datensicherheit</div>
        <p class={Styles['legal__paragraph']}>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum
          Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw.
          TLS-Verschlüsselung.
        </p>
      </div>
    );
  }
}

export default PrivacyPolicyPage;

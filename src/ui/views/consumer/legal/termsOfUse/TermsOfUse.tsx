import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from '../legal.scss';

@Component
export class TermsOfUse extends Vue {
  goBack(): void {
    this.$router.go(-1);
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['legal']}>
        <div>
          <div class={Styles['legal__title']}>
            Nutzungsbedingungen für „WirVonHier“ – Deine Shopping-App für den lokalen Einzelhandel{' '}
          </div>
          <div onClick={() => this.goBack()} class={Styles['close-button']}>
            <v-icon class={Styles['icon']}>fa-times</v-icon>
          </div>
        </div>

        <div class={Styles['legal__section']}>1. ALLGEMEINE NUTZUNGSBEDINGUNGEN</div>

        <div class={Styles['legal__subsection']}>1.1 Geltungsbereich der Nutzungsbedingungen</div>
        <p class={Styles['legal__paragraph']}>
          1.1.1 Diese Nutzungsbedingungen gelten für die App WirVonHier, welche von der WirVonHier,
          Schell_Vomhof_Römmelt_Schlott_Bein_Lippl_Römmelt_Wesseler_Held GbR, Luisenstr. 34, 60316 Frankfurt
          (nachfolgend: WirVonHier), betrieben wird. Hierbei handelt es sich um eine kostenlose App, durch die
          Verbraucher mit Einzelhändlern vernetzt werden. WirVonHier ermöglicht es lokalen Einzelhändlern sich durch ein
          Händlerprofil sowie Produktvideos zu präsentieren und zeigt den Verbrauchern bequeme Kontaktwege auf. Die
          Kontaktaufnahme zwischen Verbrauchern und Einzelhändlern erfolgt außerhalb von WirVonHier über die von den
          Einzelhändlern in ihrem Händlerprofil angegebenen Wege.
        </p>

        <p class={Styles['legal__paragraph']}>
          WirVonHier ist an der Anbahnung und dem Abschluss von Verträgen zwischen Verbrauchern und Einzelhändlern
          ausdrücklich nicht beteiligt.{' '}
        </p>

        <p class={Styles['legal__paragraph']}>
          1.1.2 Die derzeit gültigen Nutzungsbedingungen können unter [bitte URL einfügen] abgerufen und ausgedruckt
          werden.{' '}
        </p>

        <p class={Styles['legal__paragraph']}>
          1.1.3 Diese Nutzungsbedingungen regeln das Verhältnis zwischen Einzelhändlern und WirVonHier sowie zwischen
          Verbrauchern und WirVonHier, hinsichtlich der Inanspruchnahme der App.{' '}
        </p>

        <div class={Styles['legal__subsection']}>1.2 Änderungen der Nutzungsbedingungen</div>
        <p class={Styles['legal__paragraph']}>
          WirVonHier behält sich vor, diese Nutzungsbedingungen jederzeit mit Wirksamkeit auch innerhalb des bestehenden
          Nutzungsverhältnisses zu ändern.{' '}
        </p>

        <div class={Styles['legal__section']}>2. Vertragsschluss zwischen Einzelhändlern und WirVonHier</div>
        <p class={Styles['legal__paragraph']}>
          2.1 Die Nutzung der Dienste von WirVonHier setzt die Registrierung des jeweiligen Einzelhändlers voraus.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          2.2 Durch Abschluss des Registrierungsvorgangs und Erstellung eines Händlerprofils kommt ein kostenloser
          Nutzungsvertrag zwischen dem Einzelhändler und WirVonHier zustande.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          2.3 Für die Erstellung eines Händlerprofils ist die Erstellung eines Benutzerkontos erforderlich. Dieses
          besteht aus einem Benutzernamen und einem Kennwort (sog. „Log-in-Daten“).
        </p>
        <p class={Styles['legal__paragraph']}>
          2.4 Die Erstellung eines Benutzerkontos ist nur unter Angabe einer aktuellen E-Mail-Adresse des Einzelhändlers
          möglich. Die angegebene E-Mail-Adresse dient zugleich der Kommunikation mit WirVonHier.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          2.5 Der Einzelhändler sichert zu, dass die bei Erstellung seines Profils verwendeten Daten zutreffend, aktuell
          und vollständig sind. Tritt während der Dauer der Nutzung eine Änderung der angegebenen Daten ein, so wird der
          Einzelhändler diese unverzüglich in der App im Rahmen der persönlichen Einstellungen des Benutzerkontos
          aktualisieren, sofern es ihm möglich ist. Die Verwendung von Pseudonymen ist unzulässig.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>2.6 Die Vertragssprache ist deutsch.</p>
        <p class={Styles['legal__paragraph']}>
          2.7 Ein Händlerprofil darf nur von Betreibern lokaler Einzelhandelsgeschäfte angelegt werden.
        </p>
        <p class={Styles['legal__paragraph']}>
          2.8 Der Einzelhändler bestätigt mit Akzeptieren der Nutzungsbedingungen, diese von WirVonHier gestellten
          Nutzungsbedingungen und die dazugehörige Datenschutzerklärung von WirVonHier uneingeschränkt.
        </p>
        <p class={Styles['legal__paragraph']}>
          2.9 Im Rahmen des Registrierungsvorgangs wird der Einzelhändler ein möglichst sicheres Passwort zur Sicherung
          des eigenen Benutzerkontos wählen und dieses so gut wie möglich gegen eine unberechtigte Nutzung schützen. Der
          Einzelhändler wird WirVonHier umgehend informieren, sobald und sofern Anhaltspunkte für einen drohenden oder
          bereits geschehenen Passwortmissbrauch bestehen, um eine Zugangssperre mit nachfolgender Speicherung eines
          neuen Passwortes zu veranlassen.
        </p>

        <div class={Styles['legal__section']}>3. Nutzung der App </div>
        <div class={Styles['legal__subsection']}>3.1 Einzelhändler </div>
        <p class={Styles['legal__paragraph']}>
          3.1.1 Nach Angabe aller seitens des Einzelhändlers erfragten Daten sowie nach Bestätigung und Anerkennung der
          unter Ziffer 2 genannten Bedingungen und Vorgaben, ist der Einzelhändler zur Inanspruchnahme der App im Rahmen
          dieser Nutzungsbedingungen berechtigt.
        </p>
        <p class={Styles['legal__paragraph']}>
          3.1.2 Eine Korrektur und Anpassung der angegebenen Daten und des Benutzerkontos ist nach dem Einloggen in der
          App möglich.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          3.1.3 Bei der Nutzung der App kann der Einzelhändler verschiedene Dienste in Anspruch nehmen:
        </p>
        <ul class={Styles['legal__list']}>
          <li>Der Einzelhändler kann ein Händlerprofil anlegen, welches auf einer Stadtkarte dargestellt wird</li>
          <li>Der Einzelhändler kann Produktvideos teilen</li>
          <li>
            Der Einzelhändler kann Kontaktmöglichkeiten angeben mit Hilfe derer die Verbraucher mit dem Einzelhändler in
            Verbindung treten können
          </li>
          <li>Der Einzelhändler wird bei der Registrierung und Erstellung von WirVonHier unterstützt </li>
        </ul>
        <p class={Styles['legal__paragraph']}>
          3.1.4 WirVonHier ist jederzeit berechtigt, den Zugang zu einzelnen Inhalten zu sperren, z.B. wenn der Verdacht
          besteht, dass diese gegen geltendes Recht oder Rechte Dritter verstoßen.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          3.1.5 WirVonHier ist um einen störungsfreien Betrieb der App bemüht. Dies beschränkt sich naturgemäß auf
          Leistungen, auf die WirVonHier Einfluss hat. WirVonHier ist es unbenommen, den Zugang zu dem Portal aufgrund
          von Wartungsarbeiten, Kapazitätsbelangen und aufgrund anderer Ereignisse, die nicht in seinem Machtbereich
          stehen, ganz oder teilweise, zeitweise oder auf Dauer, einzuschränken.
        </p>
        <div class={Styles['legal__subsection']}>3.2 Verbraucher </div>
        <p class={Styles['legal__paragraph']}>
          3.2.1 Die Verbraucher haben keine Möglichkeit Nachrichten direkt über die App zu versenden, oder Bewertungen
          vorzunehmen. Die Kontaktaufnahme erfolgt über die von den Einzelhändlern angegebenen Kanäle.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          3.2.2 Die Verbraucher können personalisierte Angebote erhalten, indem sie ihren Standort freigeben oder ihre
          Postleitzahl eingeben.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          3.2.3 Die Verbraucher können die Händlerprofile einsehen und über die angegebenen Kontaktmöglichkeiten mit den
          Einzelhändlern, außerhalb der App in Verbindung treten.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          3.2.4. Über die App selbst werden keine Kaufverträge geschlossen. WirVonHier wird nicht Vertragspartei von
          eventuell zwischen Verbrauchern und Einzelhändlern geschlossenen Verträgen, sondern ermöglicht lediglich deren
          Vernetzung.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          3.2.5. Die Nutzung der App ist sowohl für die Verbraucher als auch für die Einzelhändler kostenlos. Die
          notwendige Registrierung der Einzelhändler ist ebenfalls kostenlos.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          3.2.6. WirVonHier ist jederzeit berechtigt, in der App bereitgestellte Dienste zu ändern, neue Dienste
          unentgeltlich oder entgeltlich verfügbar zu machen und die Bereitstellung von Diensten einzustellen.{' '}
        </p>

        <div class={Styles['legal__section']}>4. Mitwirkungspflichten des Einzelhändlers</div>
        <div class={Styles['legal__subsection']}>
          4.1 Mitwirkungspflichten beim Erstellen von Inhalten (Händlerprofil, Produktvideos etc.)
        </div>
        <p class={Styles['legal__paragraph']}>
          4.1.1 Der Einzelhändler verpflichtet sich keine Inhalte einzustellen oder zu verbreiten, welche gegen
          gesetzliche Verbote, die guten Sitten, oder Rechte Dritter verstoßen. Das Gleiche gilt für das Setzen von
          externen Links.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>4.1.2 Nicht erlaubt ist insbesondere das Einstellen von Inhalten, die </p>
        <ul class={Styles['legal__list']}>
          <li>Rassismus</li>
          <li>Gewaltverherrlichung und Extremismus jedweder Art</li>
          <li>Aufrufe und Anstiftung zu Straftaten und Gesetzesverstößen, Drohungen gegen Leib, Leben oder Eigentum</li>
          <li>Hetzen gegen Personen oder Unternehmen</li>
          <li>persönlichkeitsverletzende Äußerungen, Verleumdung</li>
          <li>urheberrechtsverletzende Inhalte oder andere Verletzungen von Immaterialgüterrechten</li>
          <li>Pornografie</li>
          <li>anstößige, sexistische, obszöne, vulgäre, oder andere sittenwidrige Materialien und Ausdrucksweisen</li>
          <li>darstellen, betreffen oder beinhalten. </li>
        </ul>

        <p class={Styles['legal__paragraph']}>
          4.1.3 Dem Einzelhändler sind darüber hinaus folgende Handlungen untersagt:{' '}
        </p>
        <ul class={Styles['legal__list']}>
          <li>die Verbreitung von Viren, Trojanern und anderen schädlichen Dateien;</li>
          <li>
            sich oder einem anderen Zugang zu Daten, die nicht für ihn bestimmt und die gegen unberechtigten Zugang
            besonders gesichert sind, unter Überwindung der Zugangssicherung zu verschaffen und/oder diese zu verwenden;
          </li>
          <li>die Versendung von Junk- oder Spam-Mails sowie von Kettenbriefen;</li>
          <li>
            die Verbreitung anzüglicher, anstößiger, sexuell geprägter, obszöner oder diffamierender Inhalte bzw.
            Kommunikation sowie solcher Inhalte bzw. Kommunikation die geeignet sind/ist, Rassismus, Fanatismus, Hass,
            körperliche Gewalt oder rechtswidrige Handlungen zu fördern bzw. zu unterstützen (jeweils explizit oder
            implizit);
          </li>
          <li>
            die Belästigung anderer Einzelhändler, oder Verbraucher, z. B. durch mehrfaches persönliches Kontaktieren
            ohne oder entgegen der Reaktion des anderen Nutzers sowie das Fördern bzw. Unterstützen derartiger
            Belästigungen;
          </li>
          <li>
            die Aufforderung anderer zur Preisgabe von Kennwörtern oder personenbezogener Daten für kommerzielle oder
            rechts- bzw. gesetzeswidrige Zwecke;
          </li>
          <li>
            die Verbreitung und/oder öffentliche Wiedergabe von auf der App verfügbaren Inhalten, soweit dies nicht
            ausdrücklich vom jeweiligen Urheber gestattet oder als Funktionalität auf der App ausdrücklich zur Verfügung
            gestellt wird;
          </li>
        </ul>

        <p class={Styles['legal__paragraph']}>
          4.1.4 Sollte dem Einzelhändler eine illegale, missbräuchliche, gegen das Nutzungsverhältnis verstoßende oder
          sonst wie unberechtigte Nutzung der App bekannt werden, so ist er verpflichtet, sich an WirVonHier zu wenden.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          4.1.5 Bei Vorliegen eines Verdachts auf rechtswidrige bzw. strafbare Handlungen ist WirVonHier berechtigt und
          ggf. auch verpflichtet, Aktivitäten zu überprüfen und ggf. geeignete rechtliche Schritte einzuleiten. Hierzu
          kann auch die Zuleitung eines Sachverhalts an die Staatsanwaltschaft gehören.
        </p>

        <div class={Styles['legal__subsection']}>4.2 Weitere Mitwirkungspflichten </div>
        <p class={Styles['legal__paragraph']}>
          4.2.1 Der Einzelhändler darf, ohne ausdrückliche Gestattung von WirVonHier, die App nur für seine gewerblichen
          Zwecke nutzen. Das bedeutet insbesondere, dass der Einzelhändler keine Nachrichten werbenden Inhalts ohne eine
          Einwilligung des Betreibers und des Empfängers verwenden darf (insbesondere: Spam-Nachrichten).
        </p>
        <p class={Styles['legal__paragraph']}>
          4.2.2 Für den Fall, dass der Einzelhändler die Möglichkeit nutzt, Dritte über die Existenz der App zu
          informieren, hat er sicherzustellen, dass der Dritte mit der Übersendung der werbenden Empfehlungs-E-Mail
          einverstanden ist.
        </p>
        <p class={Styles['legal__paragraph']}>
          4.2.3 Für den Fall, dass die Inhalte Hyperlinks auf Seiten Dritter enthalten, sichert der Einzelhändler zu,
          dass er die Berechtigung zur Nutzung des Hyperlinks hat und die Website, auf die verweisen wird
          („Landingpage“), mit geltendem Recht und Rechten Dritter vereinbar ist.
        </p>
        <p class={Styles['legal__paragraph']}>
          4.2.4 Der Einzelhändler ist verpflichtet, mit den Log-in-Daten sorgfältig umzugehen. Ihm ist es ausnahmslos
          untersagt, die Log-in-Daten Dritten mitzuteilen und/oder Dritten den Zugang zu dem Profil unter Umgehung der
          Log-in-Daten zu ermöglichen.
        </p>
        <p class={Styles['legal__paragraph']}>
          4.2.5 Sollte es bei der Nutzung der App oder seiner Funktionalitäten zu Störungen kommen, wird der
          Einzelhändler den Betreiber von dieser Störung unverzüglich in Kenntnis setzen. Gleiches gilt, wenn er
          Informationen über von Dritten veröffentlichte Inhalte erlangt, die offensichtlich gegen geltendes Recht oder
          Rechte Dritter verstoßen.
        </p>

        <div class={Styles['legal__section']}>5. Einräumung von Nutzungsrechten </div>
        <p class={Styles['legal__paragraph']}>
          5.1 Der Einzelhändler ist berechtigt, im Rahmen seines Händlerprofils unter Wahrung der nachfolgenden
          Regelungen eigene Inhalte auf der App einzustellen und damit für Dritte verfügbar zu machen.
        </p>
        <p class={Styles['legal__paragraph']}>
          5.2 Mit dem Einstellen von Inhalten räumt der Einzelhändler WirVonHier jeweils ein unentgeltliches und
          übertragbares Nutzungsrecht an den jeweiligen Inhalten ein, insbesondere zur Speicherung der Inhalte auf dem
          Server von WirVonHier bzw. den beauftragten Subunternehmern, sowie deren öffentlicher Zugänglichmachung;
          letztere innerhalb der App gegenüber den natürlichen und juristischen Personen, die einen Zugang zur App
          haben, und zu deren Bearbeitung und Vervielfältigung, soweit dies für die Vorhaltung bzw. Veröffentlichung der
          jeweiligen Inhalte erforderlich ist und zur Einräumung von – auch entgeltlichen – Nutzungsrechten gegenüber
          Dritten an den vom Einzelhändler bereitgestellten Inhalten.
        </p>
        <p class={Styles['legal__paragraph']}>
          5.3 Sofern und soweit der Einzelhändler die eigens eingestellten Inhalte wieder von der App entfernt, erlischt
          das vorstehend eingeräumte Nutzungs- und Verwertungsrecht. WirVonHier bleibt jedoch berechtigt, zu Sicherungs-
          und/oder Nachweiszwecken erstellte Kopien aufzubewahren.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          5.4 Der Einzelhändler ist für die von ihm eingestellten Inhalte voll verantwortlich. WirVonHier übernimmt
          keine Überprüfung der Inhalte auf Vollständigkeit, Richtigkeit, Rechtmäßigkeit, Aktualität, Qualität und
          Eignung für einen bestimmten Zweck.
        </p>
        <p class={Styles['legal__paragraph']}>
          5.5 Der Einzelhändler verpflichtet sich, weder im Rahmen seines Händlerprofils noch sonst auf der App Inhalte
          öffentlich zugänglich zu machen, die einen Wettbewerbsverstoß oder einen Verstoß gegen einschlägige
          berufsrechtliche Vorschriften darstellen oder die Rechte Dritter, wie beispielsweise Markenrechte, Urheber-
          und Leistungsschutzrechte, Titelschutzrechte oder Persönlichkeitsrechte, verletzen.
        </p>
        <p class={Styles['legal__paragraph']}>
          5.6 Der Einzelhändler verpflichtet sich, im Rahmen seines Händlerprofils oder sonst auf der App nur Inhalte
          (Text, Bildmaterial, Videomaterial etc.) unter Beachtung und Wahrung der Regelungen in Ziffer 4 dieser
          Nutzungsbedingungen öffentlich zugänglich zu machen, zu deren konkreter Nutzung der Einzelhändler ein
          alleiniges Recht hat oder aber anderweitig berechtigt ist (z.B. durch eine Lizenz oder eine Erlaubnis des
          Rechteinhabers).
        </p>
        <p class={Styles['legal__paragraph']}>
          5.7 WirVonHier behält sich das Recht vor, im Falle eines Hinweises auf mögliche durch den Einzelhändler
          hervorgerufene Rechtsverletzungen bzw. im Falle vorliegender Anhaltspunkte, welche einen Rechtsverstoß
          vermuten lassen, die konkreten verletzenden Inhalte vorläufig aus dem Händlerprofil zu entfernen, zu sperren
          oder zu bearbeiten und anschließend Nachforschungen in Hinsicht auf die Sach- und Rechtslage bzgl. des
          gerügten Verstoßes anzustellen (Notice-and-takedown-Verfahren). Der Einzelhändler wird sich im Rahmen der
          Aufklärung kooperativ zu WirVonHier zeigen, um eine möglichst zeitnahe Klärung zu ermöglichen. WirVonHier wird
          hierbei jedoch auf die berechtigten Interessen des Einzelhändlers Rücksicht nehmen und das mildeste Mittel zur
          Abwehr des Verstoßes wählen.
        </p>
        <p class={Styles['legal__paragraph']}>
          5.8 Im Falle von offensichtlichen und schwerwiegenden Verletzungen ist WirVonHier berechtigt, den
          rechtsverletzenden Inhalt sofortig und endgültig vom Händlerprofil des Einzelhändlers zu entfernen. WirVonHier
          wird den Einzelhändler über die Ergreifung solcher Maßnahmen informieren.
        </p>
        <p class={Styles['legal__paragraph']}>
          5.9 Die Verbraucher sind berechtigt, die auf der App verfügbaren Inhalte während der Laufzeit dieses
          Nutzungsverhältnisses ausschließlich für persönliche Zwecke online abzurufen und anzuzeigen. Eine darüber
          hinausgehende vollständige oder teilweise Bearbeitung, Vorführung, öffentliche Zugänglichmachung,
          Veröffentlichung oder Verbreitung ist dem Verbraucher nicht gestattet, es sei denn, eine solche Nutzung ist im
          Rahmen dieser Nutzungsbedingungen ausdrücklich erlaubt oder aber durch eine spezielle Funktionalität in der
          App ganz bewusst ermöglicht (z.B. durch einen Download-Button).
        </p>

        <div class={Styles['legal__section']}>6. Haftung </div>
        <p class={Styles['legal__paragraph']}>
          6.1 Sofern und soweit dem Nutzer (Verbraucher und Einzelhändler) durch die Inanspruchnahme der von WirVonHier
          angebotenen Dienste (einschließlich des Abrufs von kostenlosen Inhalten) ein Schaden entsteht, so haften
          WirVonHier für schuldhaft von ihr oder ihren Erfüllungsgehilfen verursachte Schäden an Leib, Leben und
          Gesundheit, für andere Schäden nur, wenn diese in vorsätzlicher oder grob fahrlässiger Weise von ihr oder
          ihren Erfüllungsgehilfen verursacht werden, und – soweit eine Garantie für eine besondere Beschaffenheit einer
          Dienstleistung oder eine sonstige Garantie übernommen worden ist – für Schäden, die aus der Nichterfüllung
          einer solchen Garantie entstehen.{' '}
        </p>
        <p class={Styles['legal__paragraph']}>
          6.2 Es findet in keiner Weise eine Haftungsübernahme von WirVonHier aus den vertraglichen, oder
          vorvertraglichen Beziehungen zwischen den Verbrauchern und Einzelhändlern statt.{' '}
        </p>

        <div class={Styles['legal__section']}>7. LAUFZEIT, BEENDIGUNG, SPERRUNG</div>
        <div class={Styles['legal__subsection']}>7.1 Laufzeit</div>
        <div class={Styles['legal__subsection']}>
          Das zwischen dem Nutzer und WirVonHier zustande gekommene Nutzungsverhältnis besteht grundsätzlich auf
          unbestimmte Zeit, endet jedoch, ohne dass es einer Kündigung bedarf, sobald der Nutzer nicht mehr Nutzer der
          App ist oder sonst wie keine Zugangsberechtigung mehr zur App hat.
        </div>
        <div class={Styles['legal__subsection']}>7.2 Beendigung des Nutzungsverhältnisses</div>
        <p class={Styles['legal__paragraph']}>
          7.2.1 Der Einzelhändler kann die Nutzung der App und Dienste jederzeit ohne Angabe bestimmter Gründe, durch
          das Löschen des eigenen Händlerprofils, sofern möglich, oder durch eine entsprechende Erklärung in Schriftform
          an WirVonHier, aufgeben.
        </p>
        <p class={Styles['legal__paragraph']}>
          7.2.2 WirVonHier kann das Nutzungsverhältnis jederzeit mit einer Frist von 14 Tagen vor Monatsende beenden.
          Diese Kündigung kann durch den Versand einer EMail erfolgen. Das Recht zur Sperrung des Händlerprofils gemäß
          Ziffer 5.7 und 5.8 dieser Nutzungsbedingungen bleibt hiervon unberührt.
        </p>
        <p class={Styles['legal__paragraph']}>
          7.2.3 Durch Löschen des Händlerprofils durch den Einzelhändler oder Erklärung des Einzelhändlers an WirVonHier
          endet das Nutzungsverhältnis. Eine Nutzung des Händlerprofils durch den Einzelhändler ist sodann nicht mehr
          möglich. WirVonHier ist im Falle der Beendigung des Nutzungsverhältnisses berechtigt den Benutzernamen sowie
          das Passwort mit Wirksamwerden der Kündigung zu sperren.
        </p>
        <p class={Styles['legal__paragraph']}>
          7.2.4 WirVonHier ist überdies berechtigt, mit Ablauf von einem Monat nach Wirksamwerden der Beendigung des
          Nutzungsverhältnisses und nach Ablauf etwaiger gesetzlicher Vorhaltungsfristen sämtliche im Rahmen der
          Teilnahme durch den Nutzer entstandenen Daten unwiederbringlich zu löschen.
        </p>
        <div class={Styles['legal__subsection']}>7.3 Sperrung</div>
        <p class={Styles['legal__paragraph']}>
          7.3.1 WirVonHier ist berechtigt, das Händlerprofil des Einzelhändlers vorübergehend oder dauerhaft zu sperren,
          soweit und sobald konkrete Anhaltspunkte für einen Verstoß gegen geltende Rechtsnormen und/oder diese
          Nutzungsbedingungen vorliegen. Bei der Entscheidung über eine Sperrung wird WirVonHier die berechtigten
          Interessen des Einzelhändlers angemessen berücksichtigen.
        </p>
        <p class={Styles['legal__paragraph']}>
          7.3.2 WirVonHier wird den Nutzer über diese Maßnahme per EMail benachrichtigen.
        </p>
        <p class={Styles['legal__paragraph']}>
          7.3.3 Im Falle einer nur vorübergehenden Sperrung wird WirVonHier das Händlerprofil des Einzelhändlers nach
          Ablauf einer erforderlichen und angemessenen Sperrzeit wiederherstellen und den Einzelhändler per EMail
          darüber informieren.
        </p>
        <p class={Styles['legal__paragraph']}>
          7.3.4 Im Falle einer dauerhaften Sperrung ist eine Reaktivierung des Nutzerprofils nicht möglich. Dauerhaft
          gesperrte Nutzer sind von der Teilnahme an der App dauerhaft ausgeschlossen und dürfen sich nicht erneut
          registrieren.
        </p>

        <div class={Styles['legal__section']}>8. Datenschutz</div>
        <p class={Styles['legal__paragraph']}>
          8.1 Es entspricht den Qualitätsansprüchen von WirVonHier, verantwortungsbewusst mit den persönlichen Daten der
          Nutzer (nachfolgend: "personenbezogene Daten") umzugehen. Die sich aus der Registrierung in der App sowie aus
          der Nutzung der verfügbaren Dienste ergebenden personenbezogenen Daten werden von WirVonHier daher nur
          erhoben, gespeichert und verarbeitet, soweit dies zur nutzungsverhältnisgemäßen Leistungserbringung
          erforderlich und durch gesetzliche Vorschriften erlaubt oder vom Gesetzgeber angeordnet ist. WirVonHier wird
          die personenbezogenen Daten vertraulich sowie entsprechend den Bestimmungen des geltenden Datenschutzrechts
          behandeln und nicht an Dritte weitergeben. Einzelheiten sind der Datenschutzerklärung zu entnehmen.
        </p>
        <p class={Styles['legal__paragraph']}>
          8.2 Hierüber hinaus verwendeten WirVonHier die personenbezogenen Daten nur, soweit der Nutzer hierzu
          ausdrücklich eingewilligt hat. Eine erteilte Einwilligung kann jederzeit widerrufen werden.{' '}
        </p>

        <div class={Styles['legal__section']}>9. Schlussbestimmungen</div>
        <p class={Styles['legal__paragraph']}>
          9.1 Sofern in diesen Nutzungsbedingungen nicht ausdrücklich etwas anderes angegeben ist, sind sämtliche
          Erklärungen, die im Rahmen der Nutzung der App abgegeben werden, in Schriftform oder per E-Mail abzugeben.{' '}
        </p>
        <ul class={Styles['legal__list']}>
          <li>Die Kontaktdaten von WirVonHier lauten:</li>
          <li>Post: Luisenstr. 34, 60316 Frankfurt</li>
          <li>Telefon: +49 (0) 160 8218489</li>
          <li>E-Mail: office@wirvonhier.net</li>
        </ul>
        <p class={Styles['legal__paragraph']}>
          9.2 Änderungen der Kontaktdaten bleiben vorbehalten. Im Falle einer solchen Änderung wird WirVonHier den
          Nutzer hierüber in Kenntnis setzen.
        </p>
        <p class={Styles['legal__paragraph']}>
          9.3 Sollte eine Bestimmung dieser Nutzungsbedingungen unwirksam sein oder werden, so bleibt die Wirksamkeit
          der übrigen Bestimmungen hiervon unberührt. Anstelle der unwirksamen Bestimmung gilt eine wirksame Bestimmung
          als vereinbart, die der von den Parteien gewollten wirtschaftlich am nächsten kommt. Gleiches gilt im Falle
          von Lücken in den Nutzungsbestimmungen.
        </p>
        <p class={Styles['legal__paragraph']}>
          9.4 Diese Nutzungsbedingungen unterliegen dem Recht der Bundesrepublik Deutschland unter Ausschluss des
          UN-Kaufrechts (CISG).
        </p>
        <p class={Styles['legal__paragraph']}>
          9.5 Ausschließlicher Gerichtsstand für alle sich aus diesen Nutzungsbedingungen ergebenden Streitigkeiten ist,
          soweit eine solche Gerichtsstandvereinbarung zulässig ist, München.
        </p>
      </div>
    );
  }
}

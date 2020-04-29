import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './../legal.scss';

@Component
export class CompanyDetailsPage extends Vue {
  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['legal']}>
        <div>
          <div class={Styles['legal__title']}>Impressum</div>
          <router-link to="/" class={Styles['close-button']}>
            <v-icon class={Styles['icon']}>fa-times</v-icon>
          </router-link>
        </div>
        <p>Diese Webseite (www.wirvonhier.net) ist erst vor kurzem, am 24.03.2020, veröffentlicht worden.</p>

        <p>
          Diese Seite wurde von einem Team veröffentlicht, welches sich bei dem #wirvsvirus „Hackathon“ der
          Bundesregierung gebildet hat. Wikipedia erklärt einen Hackathon wie folgt: „Ein Hackathon (Wortschöpfung aus
          „Hack“ und „Marathon“) ist eine kollaborative Soft- und Hardwareentwicklungs­veranstaltung. Alternative
          Bezeichnungen sind „Hack Day“, „Hackfest“ und „codefest“. Ziel eines Hackathons ist es, innerhalb der Dauer
          dieser Veranstaltung gemeinsam nützliche, kreative oder unterhaltsame Softwareprodukte herzustellen oder,
          allgemeiner, Lösungen für gegebene Probleme zu finden.“ (https://de.wikipedia.org/wiki/Hackathon)
        </p>

        <p>
          Weitere Informationen hinsichtlich des Hackathon der Bundesregierung #wirvsvirus, erhalten Sie unter
          https://wirvsvirushackathon.org/.
        </p>

        <p>
          Hinweis: Zu einem Hackathon gehört, dass man sich als Team sehr kurzfristig zusammenfindet und dann, mit hohem
          Energieeinsatz und unter Zeitdruck Lösungen schafft, für die Softwareenwicklungs- und Projektteams sonst ein
          vielfaches der Zeit benötigen würden. In einer solchen Situation ist Perfektionismus weder gewünscht noch
          möglich. Wir bemühen uns dennoch, alle rechtlichen Anforderungen sinnvoll zu erfüllen und Ihnen die
          Möglichkeit zu geben, sich hier über den Anbieter dieses Dienstes zu informieren. Bitte haben Sie Verständnis
          dafür, dass es sich um einen Wettbewerbsbeitrag handelt, der für den Publikumsverkehr erst in den nächsten
          Tagen und Wochen genutzt werden kann. Soweit sich für diesen Beitrag eine Betreibergesellschaft findet, resp.
          bildet, wird diese das legal sofort auf den dann geltenden Stand bringen. Bis dahin gilt als Dienstanbieter
          dieses noch experimentellen Angebots die
        </p>

        <p>wirvonhier GbR (in Gründung)</p>

        <div class={Styles['legal__section']}>Kontakt</div>
        <p>
          Telefon: in Bearbeitung
          <br />
          E-Mail: office@wirvonhier.net
        </p>

        <p>
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          <br />
          Vorname, Name
          <br />
          Straße, Nummer
          <br />
          PLZ, Ort
        </p>

        <div class={Styles['legal__section']}>EU-Streitschlichtung</div>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          https://ec.europa.eu/consumers/odr.
        </p>
        <p>Unsere E-Mail-Adresse finden Sie oben im legal.</p>

        <div class={Styles['legal__section']}>Verbraucherstreitbeilegung/Universalschlichtungsstelle</div>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>

        <div class={Styles['legal__section']}>Haftung für Inhalte</div>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
          eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
          bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
          konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
          Inhalte umgehend entfernen.
        </p>

        <div class={Styles['legal__section']}>Haftung für Links</div>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb
          können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
          stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
          Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
          Verlinkung nicht erkennbar.
        </p>

        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
          Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
          entfernen.
        </p>

        <div class={Styles['legal__section']}>Urheberrecht</div>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
          Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
          des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und
          Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>

        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
          beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
          Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>

        <p>Quelle (größtenteils): e-recht24.de</p>
      </div>
    );
  }
}

export default CompanyDetailsPage;

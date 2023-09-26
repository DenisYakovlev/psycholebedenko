import { BasePageLayout } from "../Components"
import Layout from "./Layout"
import { Helmet } from "react-helmet"
import CurrentEventSection from "./CurrentEventSection"
import FastNavSection from "./FastNavSection"


export default function Admin(){
    return (
        <BasePageLayout>
            <Helmet>
                <title>Адмінська Панель</title>
            </Helmet>

            <Layout>
                <Layout.Section>
                    <CurrentEventSection />
                </Layout.Section>

                <Layout.Section>
                    <FastNavSection />
                </Layout.Section>
            </Layout>
        </BasePageLayout>
    )
}
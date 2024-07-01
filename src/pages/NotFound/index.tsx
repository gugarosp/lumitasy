import Menu from "components/Menu";
import NotFoundContent from "components/NotFoundContent";

export default function NotFound () {
    // Page title
    document.title = `Page not found | Lumitasy`;
    
    // Meta tags
    document.querySelector("meta[name='title']")?.setAttribute("content", "Page not found | Lumitasy");
    
    return (
        <>
            <Menu />
            <NotFoundContent />
        </>
    )
}
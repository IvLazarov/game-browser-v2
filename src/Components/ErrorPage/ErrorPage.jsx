import '../ErrorPage/ErrorPage.scss';


const ErrorPage = ({mode}) => {
    return(
        <div className={`error-page ${mode === false ? 'error-page-l-mode' : 'error-page-d-mode'}`}>
            <h1>404! Page not found!</h1>
        </div>
    )
}

export default ErrorPage;
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '/Users/stephenpower/Desktop/year4/web_app_two/react-movie-labs/movies/src/components/images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres, getTvGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import { Box } from "@mui/material";


const formControl = { minWidth: "100%" };

export default function FilterMoviesCard(props) {

    const { isTv = false } = props;
    const { data, error, isPending, isError } = useQuery({
        queryKey: [isTv ? "tvGenres" : "movieGenres"],
        queryFn: () => (isTv ? getTvGenres() : getGenres()),
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value);
    };

    const handleTextChange = (e, props) => {
        handleChange(e, "name", e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };

    const handleSortChange = (e) => {
        handleChange(e, "sort", e.target.value);
    }


    return (
        <Card
            sx={{
                borderRadius: 4,
                overflow: "hidden",
                background: "linear-gradient(180deg, #6a0707 0%, #19191c 100%)",
                color: "white",
                borderRadius: 5,
                boxShadow: "0 8px 16px 0 #000000",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 16px 32px #000000",
                },
            }}
        >

            {/* https://mui.com/material-ui/react-box/ */}
            <Box
                sx={{
                    px: 2.5,
                    py: 2,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundfilter: 'blur(10px)'
                }}
            >
                <Typography variant="h5" component="h1">
                    <SearchIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Filter {isTv ? "TV Shows" : "Movies"}
                </Typography>
                <Typography variant="body2" sx={{opacity: 0.8, mt: 0.25}}>
                    Search by title, genre or sort order
                </Typography>

            </Box>

            <CardContent>

                <TextField
                    sx={{ ...formControl }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />

                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        label="Genre"
                        defaultValue=""
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        label="Sort by"
                        defaultValue=""
                        value={props.sortKey}
                        onChange={handleSortChange}
                    >
                        <MenuItem key="none" value="none">
                            Default
                        </MenuItem>
                        <MenuItem key="title" value="title">
                            Title
                        </MenuItem>
                        <MenuItem key="release_date" value="release_date">
                            Release Date
                        </MenuItem>
                    </Select>
                </FormControl>

            </CardContent>
        </Card>
    );
}

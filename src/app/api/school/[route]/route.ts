export async function POST(
  request: Request,
  { params }: { params: { route: string } },
) {
  switch (params.route) {
  }

  return new Response(
    JSON.stringify({
      questions: "!!!",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function GET(
  request: Request,
  { params }: { params: { route: string } },
) {
  switch (params.route) {
    case "userData": {
    }
  }
}
